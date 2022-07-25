<script lang="ts">
export default {
  name: 'Home'
};
</script>

<script setup lang="ts">
import { PageWrapper, Row, Col as Col, Card, Box } from '@/components';
import CardTotal from './CardTotal.vue';
import CardVisit from './CardVisit.vue';
import CardPay from './CardPay.vue';
import CardActivity from './CardActivity.vue';
import CardInfo from './CardInfo.vue';

const breadCrumbs = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'DashBoard',
    path: '/'
  }
];
</script>

<template>
  <PageWrapper header :bread-crumbs="breadCrumbs">
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
  </PageWrapper>
</template>
