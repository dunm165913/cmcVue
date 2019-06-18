<template>
  <div class="post" v-loading.fullscreen.lock="fullscreenLoading">
    <Nav/>
    <SideBar style="float:left;"/>

    <div class="post-table">
      <h2>Những bài viết của bạn</h2>
      <router-link to="NewPost">
        <el-button title="Thêm tag mới" style="margin-left:5%;font-size:15px;">
          <i class="el-icon-circle-plus"></i> Tạo bài viết mới
        </el-button>
      </router-link>
      <el-table
        :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 70%; margin-left:25%;"
      >
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="Tieu de" prop="title"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope>
            <el-input v-model="search" size="mini" placeholder="Type to search"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUrl(scope.$index, scope.row)" title="Url">Url</el-button>
            <el-button
              size="mini"
              @click="handleComment(scope.$index, scope.row)"
              title="Binh luan"
            >Bình luận</el-button>

            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" title="edit">Sửa</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              title="delete"
            >Xóa bài</el-button>
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
  name: 'Post',
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
      const url = 'http://127.0.0.1:7001/api/posts?web_id=' + localStorage.getItem('id')
      console.log(url)
      axios
        .get(
          'http://127.0.0.1:7001/api/posts?web_id=' + localStorage.getItem('id'),
          {},
          { headers: { token:"Bearer "+ localStorage.getItem('token') } },
        )
        .then(res => {
          this.tableData = res.data
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
        '/' + localStorage.getItem('name') + '/posts/' + 'postid' + '/' + row.id,
      )
    },
    handleComment(index, row) {
      window.location.replace(
        '/posts/' + row.id+'/comments?name='+row.title,
      )
    },
    handleEdit(index, row) {
      window.location.replace('/posts/' + row.id + '/update')
    },
    handleDelete(index, row) {
      this.$confirm('Bạn muốn xóa bài viết này (id=' + row.id + ')?', 'Xác nhận', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          axios
            .post(
              'http://127.0.0.1:7001/api/posts/delete',
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
