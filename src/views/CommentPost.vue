<template>
  <div class="tag" v-loading.fullscreen.lock="fullscreenLoading">
    <Nav/>
    <SideBar style="float:left;"/>
    <h2 style="text-align:center;">Danh sách tất cả bình luận của bài viết: {{title}}</h2>

    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 70%; margin-left:25%;"
    >
      <el-table-column label="Id" prop="id"></el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Noi dung" prop="comment"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import Nav from '@/components/layout/Nav'
import SideBar from '@/components/layout/SideBar'
export default {
  name: 'CommentPost',
  components: {
    Nav,
    SideBar,
  },
  data() {
    return {
      fullscreenLoading: true,
      tableData: [],
      search: '',
      title: this.$route.query.name,
    }
  },
  created() {
    if (localStorage.getItem('token'))
      axios
        .get('http://127.0.0.1:7001/api/comments?post_id=' + this.$route.params.postId)
        .then((res) => {
          console.log(  res.data[0])
          // this.tableData = res.data
          res.data.map(x => {
            console.log(x)

            let a = x.content.split('|||||')
            if (a.length == 2) {
              this.tableData.push({
                id: x.id,
                name: a[0],
                comment: a[1],
              })
            }
          })
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
    else window.location.replace('/')
  },
  methods: {
    handleEdit(index, row) {
      window.location.replace('/tags/' + row.id + '/update')
    },
    handleDelete(index, row) {
      console.log(row.id)
      this.$confirm('Bạn muốn xóa bình luận này (id comment=' + row.id + ') ?', 'Xác nhận', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
          axios
            .post(
              'http://127.0.0.1:7001/api/comments/delete',
              {
                id: row.id,
              },
              {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
              },
            )
            .then(res => {
              if (res.status == 200) {
                this.$message({ message: 'Bạn đã xóa thành công' })
                this.tableData.splice(index, 1)
              } else {
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

<style lang="scss" scoped></style>
