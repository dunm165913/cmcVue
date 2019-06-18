<template>
  <div class="side-bar">
    <el-row class="tac">
      <el-row :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          style="width:260px;height:600px;"
        >
          <el-menu-item index="/1" title="Xem trang">
            <i class="el-icon-view"></i><router-link :to="nameSite">Xem trang</router-link>
          </el-menu-item>
          <h4 style="margin-left:1%;color:#636d75;">Quản lý</h4>
          <router-link to="/posts">
            <el-menu-item index="/6" title="Quản lý bài viết">
              <i class="el-icon-document"></i><span>Quản lý bài viết</span>
            </el-menu-item></router-link
          >
          <router-link to="/tags">
            <el-menu-item index="/7" title="Quản lý tags">
              <i class="el-icon-tickets"></i><span>Quản lý tags</span>
            </el-menu-item></router-link
          >
          <router-link to="/manage-user">
          <el-menu-item index="/8" title="Đa phương tiện">
            <i class="el-icon-picture"></i><span>Người dùng</span>
          </el-menu-item>
          </router-link>
          <el-menu-item index="/9" title="Mục bình luận">
            <i class="el-icon-message"></i><span>Bình luận</span>
          </el-menu-item>
        </el-menu>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data(){
    return {
      nameSite:''
    }
  },
  created(){
    this.nameSite=localStorage.getItem('name')
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style lang="scss" scoped></style>
