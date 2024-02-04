<script setup>
import {useRoute,useRouter} from "vue-router";
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'

const router = useRouter()
const route = useRoute()
</script>

<template>
  <div>
    <el-config-provider :locale="zh">
    <router-view />
  </el-config-provider>
  </div>
</template>

<style scoped>

</style>
