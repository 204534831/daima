<script setup>
import { acticleChannelService,acticleAddService,acticleUpdateService,acticleDeleteService } from "@/api/article";
import { Edit, Delete } from "@element-plus/icons-vue";
import { ref } from "vue";
const loading = ref(false);
const centerDialogVisible = ref(false);
const ArticleList = ref("");
const formRef = ref('')
const data = ref({
  cate_alias: "",
  cate_name: "",
});
const rules = ref({
  cate_alias: [
    {
      required: true,
      message: "请输入分类名称",
      trigger:"blur"
    },
    {
      pattern:/^\S{1,10}$/,
      message:"必须是1-10位的非空字符",
      trigger:"blur"
    }
  ],
  cate_name:[
     {
      required: true,
      message: "请输入分类名称",
      trigger:"blur"
    },
  {
      pattern:/^[a-zA-Z0-9]{1,15}$/,
      message:"必须是1-15位的非空字符",
      trigger:"blur"
    }
  ]
});


const getList = async () => {
  loading.value = true;
  const res = await acticleChannelService();
  ArticleList.value = res.data.data;
  loading.value = false;
};
getList();

const addActivice =async (cate_name,cate_alias)=>{
  centerDialogVisible.value = false
  data.value.id? await acticleUpdateService(data.value.id,data.value.cate_name,data.value.cate_alias):
 await acticleAddService(data.value.cate_alias,data.value.cate_name)
  getList()
}
const isEdit = async (row) =>
{
  centerDialogVisible.value = true
  data.value = {...row}
} 
const open = (row) => {
  console.log(row.id);
  ElMessageBox.confirm(
    '你确定要删除吗?',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      await acticleDeleteService(row.id)
      getList()
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
     return
    })
}
</script>
<template>
  <card title="文章分类">
    <template #extra>
      <el-button type="primary" @click="centerDialogVisible = true"
        >添加分类</el-button
      >
    </template>
    
    <el-table v-loading="loading" :data="ArticleList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_alias" label="分类名称" width="500" />
      <el-table-column prop="cate_name" label="分类别名" width="500" />
      <el-table-column prop="address" label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            @click="isEdit(row)"
          ></el-button>
          <el-button type="danger" @click="open(row)" :icon="Delete" circle />
        </template>
      </el-table-column>
      <template #empty>
    <el-empty description="没有数据" />
  </template>
    </el-table>
  </card>
  <el-dialog v-model="centerDialogVisible" :title="data.id?'编辑分类':'添加分类'" width="30%" center>
    <el-form label-width="120px; " :model="data" :rules="rules" ref="formRef">
      <el-form-item label="分类名称" prop="cate_alias">
        <el-input v-model="data.cate_alias" />
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_name">
        <el-input v-model="data.cate_name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addActivice(data)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
el-table-column {
  height: 200px;
}
</style>
