<script setup lang="ts">
import { PropType } from 'vue';
import { ElTooltip } from 'element-plus';
import IconUp from '@/assets/icons/up.svg?component';
import IconDown from '@/assets/icons/down.svg?component';
import IconInfo from '@/assets/icons/info-circle.svg?component';
import * as S from './index.module.scss';

const props = defineProps({
  chart: {
    type: Boolean,
    default: false
  },
  footerTrend: {
    type: Boolean,
    default: false
  },
  trends: {
    type: Array as PropType<(-1 | 1)[]>,
    default: () => [1, 1]
  },
  tip: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div :class="S.chartCard">
    <div :class="S.chartTop">
      <div :class="S.metaWrap">
        <div :class="S.meta">
          <slot name="meta"></slot>
          <ElTooltip :content="props.tip">
            <span :class="S.action">
              <IconInfo />
            </span>
          </ElTooltip>
        </div>
        <div :class="S.total">
          <slot name="total"></slot>
        </div>
      </div>
    </div>

    <div :class="S.content">
      <div :class="S.contentFixed">
        <template v-if="!props.chart">
          <div :class="S.trendItem">
            <span>
              <slot name="trend1"></slot>
              <span :class="S.trendText">
                <slot name="trendText1"></slot>
              </span>
            </span>
            <span v-if="props.trends[0] === 1" :class="S.up">
              <IconUp />
            </span>
            <span v-if="props.trends[0] === -1" :class="S.down">
              <IconDown />
            </span>
          </div>
          <div :class="S.trendItem">
            <span>
              <slot name="trend2"></slot>
              <span :class="S.trendText">
                <slot name="trendText2"></slot>
              </span>
            </span>
            <span v-if="props.trends[1] === 1" :class="S.up">
              <IconUp />
            </span>
            <span v-if="props.trends[1] === -1" :class="S.down">
              <IconDown />
            </span>
          </div>
        </template>
        <div v-if="props.chart" :class="S.chart">
          <slot name="chart"></slot>
        </div>
      </div>
    </div>

    <div :class="S.footer">
      <template v-if="!props.footerTrend">
        <div :class="S.label">
          <slot name="label"></slot>
        </div>
        <div :class="S.number">
          <slot name="number"></slot>
        </div>
      </template>
      <template v-if="props.footerTrend">
        <div :class="S.trendItem">
          <span>
            <slot name="trend1"></slot>
            <span :class="S.trendText">
              <slot name="trendText1"></slot>
            </span>
          </span>
          <span v-if="props.trends[0] === 1" :class="S.up">
            <IconUp />
          </span>
          <span v-if="props.trends[0] === -1" :class="S.down">
            <IconDown />
          </span>
        </div>
        <div :class="S.trendItem">
          <span>
            <slot name="trend2"></slot>
            <span :class="S.trendText">
              <slot name="trendText2"></slot>
            </span>
          </span>
          <span v-if="props.trends[1] === 1" :class="S.up">
            <IconUp />
          </span>
          <span v-if="props.trends[1] === -1" :class="S.down">
            <IconDown />
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
