<template>
  <div>
    <Nav />
    <SideBar style="float:left;" />
    <div class="newTag">
      <h2>Tạo tag mới</h2>
      <el-input placeholder="Tag Name ..." v-model="input" style="width:500px;"></el-input>
      <br />
      <el-button type="primary" v-on:click="created()">Create</el-button>
    </div>
  </div>
</template>
<script>
import Nav from '@/components/layout/Nav'
import SideBar from '@/components/layout/SideBar'
import axios from 'axios'
export default {
  name: 'NewTag',
  components: {
    Nav,
    SideBar,
  },
  data() {
    return {
      input: '',
    }
  },
  methods: {
    created() {
      const name = this.input
      if (!name) {
        return this.$message({ message: 'Vui lòng nhập tên tag' })
      }
      const loading = this.$loading({
          lock: true,
          text: "Đang tải lên",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      axios
        .post(
          'http://127.0.0.1:7001/api/tags',
          {
            name: name,
          },
          {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
          },
        )
        .then(res => {
          if (res.status == 200) {

            this.input = ''
            setTimeout(()=>{
              loading.close()
              this.$message({ message: 'Bạn đã tải lên thành công' })
            },1000)
            setTimeout(()=>{

              window.location.replace('/tags')},3000)
          } else {
            this.$message({ message: 'Có lỗi xảy ra, vui lòng thử lại' })
          }
        })
        .catch(() => {
          this.$message({ message: 'Lỗi kết nối' })
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.newTag {
  margin: 5% 0 0 30%;
  width: 40%;
  background-color: rgb(239, 250, 250);
  padding: 60px 70px;
  button {
    margin-top: 30px;
  }
}
</style>
