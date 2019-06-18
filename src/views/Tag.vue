<template>
  <div class="tag" v-loading.fullscreen.lock="fullscreenLoading">
    <Nav/>
    <SideBar style="float:left;"/>
    <h2 style="text-align:center;">Quản lý các tags</h2>
    <router-link to="NewTag">
      <el-button title="Thêm tag mới" style="margin-left:5%;font-size:15px;">
        <i class="el-icon-circle-plus"></i> Tạo tag mới
      </el-button>
    </router-link>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 70%; margin-left:25%;"
    >
      <el-table-column label="Id" prop="id"></el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope>
          <el-input
            v-model="search"
            v-on:change="searchtag()"
            size="mini"
            placeholder="Type to search"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Sửa</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Xóa</el-button>
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
  name: 'Tag',
  components: {
    Nav,
    SideBar,
  },
  data() {
    return {
      fullscreenLoading: true,
      tableData: [],
      search: '',
    }
  },
  created() {
    if (localStorage.getItem('token'))
      axios
        .get('http://127.0.0.1:7001/api/tags?web_id=' + localStorage.getItem('id'), {})
        .then(res => {
          console.log(res)
          // this.tableData = res.data
          res.data.map(x => {
            if (x.name.indexOf('undefined') < 0) this.tableData.push(x)
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
      this.$confirm('Bạn muốn xóa Tag này (id=' + row.id + ')?', 'Xác nhận', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          axios
            .post(
              'http://127.0.0.1:7001/api/tags/delete',
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
