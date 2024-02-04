<script setup>
import { ref } from "vue";
import { getList } from "@/api/article";
import { formatTime } from "@/utils/time";
import ChannelSelect from '@/components/ChannelSelect.vue'
import ArticleEdit from '@/components/ArticleEdit.vue'
import { Edit, Delete } from "@element-plus/icons-vue";

const loading = ref("");
const value1 = ref("");
const title = ref([]);
const params = ref({
  pagenum: 1, //当前页
  pagesize: 4, //当前生效的每页条数
  cate_id: "",
  state: "", //状态
});
const total = ref(0);

const onSizeChange = (size) => {
  params.value.pagenum = 1;
  params.value.pagesize = size;
  list();
};

const onCurrentChange = (page) => {
  params.value.pagenum = page;
  list();
};

const articleList = ref("");

const list = async () => {
  loading.value = true;
  const res = await getList(params.value);
  articleList.value = res.data.data;
  total.value = res.data.total;
  loading.value = false;
};

list();

const acticleSearch= ()=>{
  params.value.pagenum = 1
  list()
}
const acticleReset=()=>{
  params.value.pagenum =1
  params.value.cate_id = ""
  params.value.state=""
  list()
}

const articleEditRef = ref()
const onAddActicle=()=>{
  articleEditRef.value.open({})
}
const onEditActicle=(row)=>{
  articleEditRef.value.open(row)
}
</script>

<template>
  <card title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddActicle"> 发布文章 </el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态" >
        <el-select v-model="params.state" style="width: 240px" placeholder="请选择">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="acticleSearch">搜索</el-button>
        <el-button @click="acticleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="文章标题" width="400" />
      <el-table-column prop="cate_name" label="分类" width="250" />
      <el-table-column label="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="200" />
       <el-table-column prop="address" label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            @click="onEditActicle(row)"
          ></el-button>
          <el-button type="danger" @click="open(row)" :icon="Delete" circle />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[1, 2, 4, 8]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </card>
<ArticleEdit ref="articleEditRef"></ArticleEdit>
 
</template>