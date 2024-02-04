<script setup>
import { useUserStore } from '@/stores'
import { onMounted, ref } from 'vue'




const userStore = useUserStore()
onMounted(()=>{
  userStore.getUser()
})

const {
  user: { username, nickname, email, id }
} = useUserStore()

const userInfo = ref({ username, nickname, email, id })

const formRef = ref("")

</script>


<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>基本信息 </span>
      </div>
    </template>
  <el-form
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交修改</el-button>
          </el-form-item>
        </el-form>
  </el-card>
</template>
<style lang="scss" scoped>
.el-form{
  height: 100vh;
}
.el-form-item{
  height: 40px;
  .el-input{
    height:40px;
    width:50%
  }
}
</style>