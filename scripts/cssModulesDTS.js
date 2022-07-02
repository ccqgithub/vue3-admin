const path = require('path');
const sass = require('sass');
const glob = require('glob');
const watch = require('node-watch');
const minimatch = require('minimatch');
const DtsCreator = require('typed-css-modules');

const RealDtsCreator = DtsCreator.default;
const root = process.cwd();
const creator = new RealDtsCreator({
  rootDir: root,
  namedExports: true
});

const updateFile = async (f) => {
  try {
    const out = await sass.compileAsync(f, {
      importers: [
        {
          findFileUrl(url) {
            if (!url.startsWith('@')) return null;
            return new URL(
              url.substring(1),
              path.resolve(__dirname, '../src/')
            );
          }
        }
      ]
    });
    await creator.create(f, out.css, true).then((content) => {
      return content.writeFile();
    });
  } catch (e) {
    console.error(e);
  }
};

watch(
  root,
  {
    recursive: true,
    filter: (f) => minimatch(f, '**/*.module.scss')
  },
  (evt, name) => {
    if (evt === 'update') {
      updateFile(name);
    }
  }
);

glob(
  '**/*.module.scss',
  {
    cwd: root
  },
  (er, files) => {
    files.forEach((f) => {
      updateFile(path.resolve(root, f));
    });
  }
);
