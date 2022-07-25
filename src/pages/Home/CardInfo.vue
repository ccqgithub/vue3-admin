<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { loadBMap } from '@/utils';
import { Card } from '@/components';
import msJson from '@/config/custom-map-config.json';
import * as S from './index.module.scss';
import { data } from './info';

const el = ref<HTMLDivElement | null>(null);

const colorSelect = (n: number) => {
  let color = '#5592c7';
  if (n >= 1 && n <= 10) {
    color = '#6fec4f';
  } else if (n >= 11 && n <= 20) {
    color = '#5dc642';
  } else if (n >= 21 && n <= 30) {
    color = '#4ba035';
  } else if (n >= 31 && n <= 40) {
    color = '#397929';
  } else if (n >= 41) {
    color = '#27531c';
  } else {
    color = '#5592c7';
  }
  return color;
};

const initMap = () => {
  const map = new BMapGL.Map(el.value!);
  map.setMapStyleV2({
    styleJson: msJson.styles as any
  });
  map.centerAndZoom(new BMapGL.Point(116.274625, 39.961627), 5);
  // map.enableScrollWheelZoom(true);
  map.addEventListener('zoomend', () => {
    console.log(map.getZoom());
  });
  map.setHeading(0);
  map.setTilt(45);

  data.forEach((v) => {
    try {
      const color = colorSelect(v.value);
      const layer = new BMapGL.DistrictLayer({
        name: `(${v.name})`,
        fillColor: color,
        fillOpacity: 0.9,
        strokeColor: '#daeafa',
        viewport: false
      });
      layer.addEventListener('mouseover', function (e: any) {
        e.currentTarget.setFillColor('#9169db');
      });
      layer.addEventListener('mouseout', function (e: any) {
        e.currentTarget.setFillColor(e.currentTarget.style.fillColor);
      });
      map.addDistrictLayer(layer);
    } catch (e) {
      console.log(e);
    }
  });
};

onMounted(() => {
  loadBMap()
    .then(() => {
      initMap();
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error(err.message);
    });
});
</script>

<template>
  <Card title="详细">
    <div :class="S.cardInfo">
      <div ref="el" :class="S.map"></div>
    </div>
  </Card>
</template>
