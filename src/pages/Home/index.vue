<script lang="ts">
export default {
  name: 'Home'
};
</script>

<script setup lang="ts">
import { PageWrapper, Row, Col, Card, Box } from '@/components';
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
          <Card style="height: 100%">
            <div style="height: 300px">3444</div>
          </Card>
        </Col>
        <Col>
          <Card>
            <div style="height: 300px">3444</div>
          </Card>
          <Card>
            <div style="height: 100px">3444</div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <div style="height: 600px">3444</div>
          </Card>
        </Col>
      </Row>
    </Box>
  </PageWrapper>
</template>
