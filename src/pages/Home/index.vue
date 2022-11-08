<script lang="ts">
export default {
  name: 'Home'
};
</script>

<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus';
import { PurePage, Row, Col as Col, Card, Box } from '@/components';
import CardTotal from './CardTotal.vue';
import CardVisit from './CardVisit.vue';
import CardPay from './CardPay.vue';
import CardActivity from './CardActivity.vue';
import CardInfo from './CardInfo.vue';
import S from './index.module.scss';
</script>

<template>
  <PurePage>
    <template #headerRight>
      <ElSelect>
        <ElOption value="test" label="test" />
      </ElSelect>
    </template>
    <div :class="S.page">
      <Box>
        <Row>
          <Col>
            <Card>
              <CardTotal></CardTotal>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardVisit></CardVisit>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardPay></CardPay>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardActivity></CardActivity>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <CardInfo />
          </Col>
        </Row>
      </Box>
    </div>
  </PurePage>
</template>
