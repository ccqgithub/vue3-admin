export type BreakPoints = 'xxl' | 'xl' | 'l' | 'm' | 's' | 'sx';

export const breackPointsMaxWidth = new Map<BreakPoints, number>([
  ['xxl', 9999],
  ['xl', 1920],
  ['l', 1536],
  ['m', 1280],
  ['s', 1024],
  ['sx', 640]
]);

export const getBreakpoint = (winWidth: number = window.innerWidth) => {
  let breakpont: BreakPoints = 'xxl';
  const below = {} as Record<BreakPoints, boolean>;
  const above = {} as Record<BreakPoints, boolean>;

  for (const [key, value] of breackPointsMaxWidth) {
    if (winWidth <= value) {
      breakpont = key;
      below[key] = true;
      above[key] = false;
    } else {
      below[key] = false;
      above[key] = true;
    }
  }

  const maxWidth = breackPointsMaxWidth.get(breakpont) || 0;
  return {
    breakpont,
    maxWidth,
    below,
    above
  };
};
