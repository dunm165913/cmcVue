<template>
  <div class="tag">
    <Nav />
    <SideBar style="float:left;" />
    <div class="newPost">
      <h2 style="margin: 10% 0 0 20%">Cập nhật Tag</h2>
      <h4>{{ id }}</h4>
      <br />
      <h4>Tên tag</h4>
      <el-input
        type="textarea"
        placeholder="Write some thing ..."
        v-model="textarea"
        style="width:500px;"
      ></el-input>
      <br />
      <el-button type="primary" v-on:click="updated()">Cập nhật</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Nav from '@/components/layout/Nav'
import SideBar from '@/components/layout/SideBar'
export default {
  name: 'UpdateTag',
  components: {
    Nav,
    SideBar,
  },
  data() {
    return {
      id: '',
      textarea: '',
      search: '',
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      let id2 = window.location.href
      id2 = id2.split('/')[4]
      axios.get('http://127.0.0.1:7001/api/tags/' + id2, {}).then(res => {
        console.log(res.data)
        this.id = 'Id:' + res.data.id
        this.textarea = res.data.name
      })
    } else {
      window.location.replace('/')
    }
  },
  methods: {
    updated() {
      let id1 = this.id.split(':')[1]
      const name = this.textarea
      if (name.length == 0) {
        return this.$message({ message: 'Vui lòng nhập tên Tag' })
      } else {
        this.$confirm('Bạn muốn thay đổi?', 'Xác nhận', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        })
          .then(() => {
            axios
              .patch(
                'http://127.0.0.1:7001/api/tags/' + id1,
                {
                  name: name,
                },
                {
                  headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
                },
              )
              .then(res => {
                if (res.status == 200) {
                  this.$message({ message: 'Cập nhậ thành công' })
                  setTimeout(() => {
                    window.location.replace('/tags')
                  }, 3000)
                } else {
                  this.$message({ message: 'Cập nhật thất bại' })
                }
              })
          })
          .catch(() => {})
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.newPost {
  margin: 0 0 0 40%;
  button {
    margin-top: 30px;
  }
}
</style>
