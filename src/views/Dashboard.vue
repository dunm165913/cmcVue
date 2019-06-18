<template>
  <div class="post">
    <Nav/>
    <SideBar style="float:left;"/>
    <div class="dashboarch-content">
      <div class="FirstPage">
      <el-row>
        <el-col :span="20">
          <div class="grid-content bg-purple-dark">
            <h1>Tạo Site theo phong cách của bạn</h1>
            <span>Bạn đang trên đường tạo Site, tiếp tục nào</span>
            <br>
            <br>
            <router-link to="/NewTag">
              <br>
            </router-link>
            <img id="img-firstpage" src="../assets/webdemo.png">
          </div>
        </el-col>
      </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Nav from '@/components/layout/Nav'
import SideBar from '@/components/layout/SideBar'
import FirstPage from '@/components/layout/FirstPage'
export default {
  name: 'Dashboard',
  components: {
    Nav,
    SideBar,
    FirstPage,
  },
  data() {
    return {
      search: '',
    }
  },
  created() {
    if (localStorage.getItem('token') == null) window.location.replace('/')
    else
      axios
        .get(
          'http://127.0.0.1:7001/api/tags?user_id=' + localStorage.getItem('id'),
          {},
          { headers: { token: localStorage.getItem('token') } },
        )
        .then(res => {
          console.log(res.data)
          if (res.data.length == 1) window.location.replace('/dashboard/new')
        })
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row)
    },
  },
}
</script>

<style lang="scss" scoped>
.post-table {
  .img {
    width: 100px;
  }
}
h2 {
  font-weight: 500;
  text-align: center;
}
.FirstPage {
  margin-left: 25%;
  h1 {
    font-size: 50px;
    margin-top: 30px;
    margin-bottom: 16px;
     font-family: Georgia, 'Times New Roman', Times, serif;
     width: 100%;
  }
  span {
    font-size: 22px;
    font-family:'Times New Roman', Times, serif;
    font-style: italic;

    }
  button {
    margin-top: 30px;
    width: 160px;
    height: 40px;
    font-size: 15px;
  }

  text-align: center;
  .fter {
    width: 100%;
    height: 250px;
    background-color: #dcdcdc;
    margin-top: 80px;
  }
}
</style>
