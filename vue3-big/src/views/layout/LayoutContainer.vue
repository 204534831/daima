<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import user from '@/assets/default.png'
</script>

<template>
    <el-container class="common-layout">
      <el-aside width="200px">
      <div class="logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
      <el-container>
        <el-header>
          <div class="top">
            黑马程序员：<strong>ssss</strong>
          </div>
           <el-dropdown>
      <span class="el-dropdown-link">
      <el-avatar :src="user" />
      <el-icon><CaretBottom /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>基本资料</el-dropdown-item>
        <el-dropdown-item>更换头像</el-dropdown-item>
        <el-dropdown-item>重置密码</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
         <el-footer>
           <div class="footer">
              大事件 &copy; 2024 Create by sxz
           </div>
         </el-footer>
      </el-container>
    </el-container>
</template>
<style lang="scss" scoped>
.common-layout{
  height: 100vh;
   .el-aside{
   background-color: #232323;
    .logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center/120px auto
    }
  }
  .el-header{
    height: 60px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    align-items: center;
    .el-dropdown-link{
      display: flex;
      align-items: center;
    }
  }
  .el-footer{
    height: 60px;
    background-color: #ecebeb;
    text-align: center;
    line-height: 60px;
    font-size: 14px;
    color: rgb(97, 97, 97);
  }
   
 
}
</style>