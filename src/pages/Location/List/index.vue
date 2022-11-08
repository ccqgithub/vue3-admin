<script lang="ts">
export default {
  name: 'LocationList'
};
</script>

<script setup lang="ts">
import {
  onMounted,
  reactive,
  ref,
  onActivated,
  onDeactivated,
  nextTick
} from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useElementSize, MaybeElement } from '@vueuse/core';
import {
  ElTable,
  ElTableColumn,
  // ElSelect,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  // ElOption,
  ElPagination,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
  ElPopover,
  ElMessage
} from 'element-plus';
import {
  ArrowDown,
  Plus as IconPlus,
  Search as IconSearch,
  Edit as IconEdit,
  Delete as IconDelete,
  TopRight,
  Select as IconSelect,
  CloseBold
} from '@element-plus/icons-vue';
import { ListPage } from '@/components';
import { listState, confirm } from '@/utils';
import { LocationItem } from '@/types';
import { useBreakpoint } from '@/use';
import { locationList, locationPatch, locationDelete } from '@/service';
import S from './index.module.scss';

const router = useRouter();
const breakpoint = useBreakpoint();
const tableWrapper = ref<MaybeElement>();
const tableRef = ref();
const { height } = useElementSize(tableWrapper);
const lastScrollTop = ref(0);
const { state, gotoPage } = listState<LocationItem>({
  size: 20,
  fetchPage: async (args) => {
    return await locationList({
      page: args.page,
      size: args.size,
      keyword: form.keyword,
      status: form.status
    });
  }
});
const form = reactive({
  keyword: '',
  status: ''
});

const query = () => {
  gotoPage(1, true);
};

const viewSpaces = (row: LocationItem) => {
  const { href } = router.resolve({
    name: 'SpaceList',
    params: { locationId: `location-${row.id}` }
  });
  window.open(href);
};

const handleEdit = (row: LocationItem) => {
  router.push({
    name: 'LocationEdit',
    params: { id: row.id, type: 'edit' },
    state: { from: 'list' }
  });
};

const handleDelete = async (row: LocationItem) => {
  const res = await confirm({
    title: 'Publish location',
    content: 'Are you sure to unpublish the location?'
  });
  if (!res) return;
  try {
    await locationDelete(row.id);
    ElMessage.success('Unpublished');
    gotoPage(state.page);
  } catch (e: any) {
    ElMessage.error(e.message);
  }
};

onDeactivated(() => {
  if (!tableRef.value) return;
  lastScrollTop.value = tableRef.value.scrollBarRef.wrap$.scrollTop;
});

onActivated(() => {
  nextTick(() => {
    setTimeout(() => {
      tableRef.value.setScrollTop(lastScrollTop.value);
    }, 200);
  });
});

onMounted(() => {
  query();
});
</script>

<template>
  <ListPage>
    <template #headerRight>
      <ElButton @click="router.push({ name: 'LocationCreate' })">
        <ElIcon><IconPlus /></ElIcon>
        <span>Add Location</span>
      </ElButton>
    </template>

    <template #top>
      <ElForm :inline="true" :model="form" :class="S.filters">
        <ElFormItem label="Location Name">
          <ElInput
            v-model="form.keyword"
            placeholder="Location Name"
            :clearable="true"
            :class="S.input"
          />
        </ElFormItem>
        <!-- <ElFormItem label="Publish Status">
          <ElSelect v-model="form.status" placeholder="All">
            <ElOption label="Published" value="PUBLISHED" />
            <ElOption label="Unpublished" value="UNPUBLISHED" />
          </ElSelect>
        </ElFormItem> -->
        <ElFormItem>
          <ElButton type="primary" :loading="state.refreshing" @click="query">
            <ElIcon><IconSearch /></ElIcon>
            <span>Query</span>
          </ElButton>
        </ElFormItem>
      </ElForm>
    </template>

    <div ref="tableWrapper" v-loading="state.loading" :class="S.tableWrapper">
      <div :class="S.table">
        <ElTable
          ref="tableRef"
          border
          :data="state.list"
          :style="{ width: '100%' }"
          :height="height - 50"
          :header-cell-class-name="S.tableHead"
          :empty-text="state.end ? 'no data' : 'loading...'"
        >
          <!-- id -->
          <ElTableColumn
            :fixed="breakpoint.below.s ? false : 'left'"
            prop="id"
            label="ID"
            width="80"
          />
          <!-- name -->
          <ElTableColumn label="Country" min-width="120">
            <template #default="scope">
              <span>{{ `${scope.row.name}` }}</span>
            </template>
          </ElTableColumn>
          <!-- country -->
          <ElTableColumn label="Country" width="120">
            <template #default="scope">
              <span>{{ `${scope.row.countryName}` }}</span>
            </template>
          </ElTableColumn>
          <!-- City -->
          <ElTableColumn label="City" width="120">
            <template #default="scope">
              <span>{{ `${scope.row.cityName}` }}</span>
            </template>
          </ElTableColumn>
          <!-- actions -->
          <ElTableColumn
            :fixed="breakpoint.below.s ? false : 'right'"
            label="Operations"
            width="180"
          >
            <template #default="scope">
              <ElButton size="small" @click="handleEdit(scope.row)">
                <ElIcon><IconEdit /></ElIcon>
                <span>Edit</span>
              </ElButton>
              <ElButton
                size="small"
                type="danger"
                @click="handleDelete(scope.row)"
              >
                <ElIcon><IconDelete /></ElIcon>
                <span>Delete</span>
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
      <div :class="S.paging">
        <ElPagination
          background
          layout="prev, pager, next"
          :total="state.total"
          :page-size="state.size"
          :current-page="state.page"
          @current-change="(v) => gotoPage(v)"
        />
      </div>
    </div>
  </ListPage>
</template>
