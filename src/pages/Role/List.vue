<script setup lang="ts">
import { ElTable, ElTableColumn, ElButton } from 'element-plus';

const tableData = [
  {
    id: 1,
    username: 'Test 1'
  },
  {
    id: 2,
    username: 'Test 2'
  },
  {
    id: 3,
    username: 'Test 3'
  }
];

const toAdd = () => {};

const toEdit = () => {};

const toDetail = (scope: any) => {
  console.log(scope);
};
</script>

<template>
  <div>
    <ElButton link type="primary" @click="toAdd">添加新用户</ElButton>
  </div>
  <div>
    <ElTable :data="tableData" border style="width: 100%">
      <ElTableColumn prop="id" label="ID" width="50" />
      <ElTableColumn prop="username" label="Name" width="180" />
      <ElTableColumn fixed="right" label="Operations" width="120">
        <template #default="scope">
          <ElButton link type="primary" @click="toDetail(scope)">详情</ElButton>
          <ElButton link type="primary" @click="toEdit">编辑</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>
