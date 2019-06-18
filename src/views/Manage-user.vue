<template>
  <div class="post" v-loading.fullscreen.lock="fullscreenLoading">
    <Nav/>
    <SideBar style="float:left;"/>

    <div class="post-table">
      <h2>Danh sách user của bạn</h2>

      <el-table
        :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 70%; margin-left:25%;"
      >
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="name" prop="name"></el-table-column>
        <el-table-column label="email" prop="email"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope>
            <el-input v-model="search" size="mini" placeholder="Type to search"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              title="delete"
            >Xóa</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Nav from '@/components/layout/Nav'
import SideBar from '@/components/layout/SideBar'
import { constants } from 'fs'
export default {
  name: 'Manage-user',
  components: {
    Nav,
    SideBar,
  },
  data() {
    return {
      fullscreenLoading: true,
      tableData: [],
      search: '',
      index: 0,
    }
  },
  created() {
    if (localStorage.getItem('token') == null) window.location.replace('/')
    else {
      axios
        .post(
          'http://localhost:7001/api/users/all',
          {},
          {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
          },
        )
        .then(res => {
          console.log(res.data)
          if (res.data.code == 1000) this.tableData = res.data.data
          setTimeout(() => {
            this.fullscreenLoading = false
          }, 100)
        })
        .catch(() => {
          this.$message({ message: 'Lỗi kết nối' })
          setTimeout(() => {
            this.fullscreenLoading = false
          }, 100)
        })
    }
  },
  methods: {
    handleUrl(index, row) {
      window.location.replace(
        '/' + localStorage.getItem('name') + '/posts/' + row.title + '/' + row.id,
      )
    },
    handleComment(index, row) {
      window.location.replace('/posts/' + row.id + '/comments?name=' + row.title)
    },
    handleEdit(index, row) {
      window.location.replace('/posts/' + row.id + '/update')
    },
    handleDelete(index, row) {
      this.$confirm('Bạn muốn xóa user này (id=' + row.id + ')?', 'Xác nhận', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          axios
            .post(
              'http://127.0.0.1:7001/api/users/delete',
              {
                id: row.id,
              },
              {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
              },
            )
            .then(res => {
              console.log(res.status)
              if (res.status == 200) {
                this.$message({ message: 'Bạn đã xóa thành công' })
                this.tableData.splice(index, 1)
              } else {
                console.log('okllllllllll')
                this.$message({ message: 'Có lỗi xảy ra, vui lòng thử lại' })
              }
            })
            .catch(() => {
              this.$message({ message: 'Lỗi kết nối' })
            })
        })
        .catch(() => {
          this.$message({ message: 'Bạn đã hủy thao tác' })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.post-table {
  h2 {
    text-align: center;
  }
}
</style>
