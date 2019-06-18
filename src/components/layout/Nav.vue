<template>
  <div class="nav">
    <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#00ffff">
      <el-menu-item index="/1" id="logo">
        <router-link to="/" title="Logo CMS">CMS</router-link>
      </el-menu-item>

      <el-menu-item index="/2">
        <router-link :to="{ path: '/'+nameSite }" replace title="My Sites">My Sites</router-link>
      </el-menu-item>
      <el-menu-item index="/2">
        <router-link to="/dashboard" title="My Sites">Bảng điều khiển</router-link>
      </el-menu-item>

      <el-button style="float:right;margin-top:10px;" type="primary" v-on:click="logout()">Log out</el-button>

      <el-menu-item index="/4" class="fr">
        <el-dropdown>
          <span class="el-dropdown-link">{{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Thông tin cá nhân</el-dropdown-item>
            <el-dropdown-item>Đổi mật khẩu</el-dropdown-item>
            <el-dropdown-item>Cập nhật tài khoản</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>

      <el-menu-item index="/5" class="fr">
        <router-link to="/newpost">
          <el-button title="Viết bài mới">
            <i class="el-icon-circle-plus"></i>Tạo bài viết mới
          </el-button>
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      nameSite: '',
    }
  },

  created() {
    if (localStorage.getItem('token') == null) window.location.replace('/')
    this.name = localStorage.getItem('name')
    this.nameSite = localStorage.getItem('name')
  },
  methods: {
    logout() {
      localStorage.clear()
      window.location.replace('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;

  .fr {
    float: right;
  }
  .el-menu-demo {
    &:hover {
      background-color: aquamarine;
    }
  }
}
#logo {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 40px;
}
</style>
