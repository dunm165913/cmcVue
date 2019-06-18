<template>
  <div class="tag">
    <Nav/>
    <div>
      <SideBar style="float:left;"/>
         <div class="newPost" style="float:right;margin-right:5%">
        <h2 style="margin: 5% 0 0 20%">Cập nhật bài viết</h2>
        <h4>{{ id }}</h4>

        <h4>Tên bài viết</h4>
        <el-input v-model="title" style="width:500px"></el-input>
        <h4>Tag</h4>
        <el-checkbox-group v-model="checked">
          <el-checkbox v-for="city in options" :label="city.id" :key="city.id">
            {{
            city.name
            }}
          </el-checkbox>
        </el-checkbox-group>
        <br>

        <h4>Nội dung</h4>
        <vue-editor v-model="content"></vue-editor>
        <br>
        <el-button type="primary" v-on:click="updated()">Cập nhật</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Nav from '@/components/layout/Nav'
import SideBar from '@/components/layout/SideBar'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'UpdatePost',
  components: {
    Nav,
    SideBar,
    VueEditor,
  },
  data() {
    return {
      checked: [],
      value: '',
      options: [],
      id: '',
      title: '',
      content: '',
      search: '',
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      let id1 = window.location.href
      axios
        .get('http://127.0.0.1:7001/api/tags?web_id=' + localStorage.getItem('id'), {})
        .then(res => {
          res.data.map(x => {
            console.log(x.name.indexOf('undefined'))
            if (x.name.indexOf('undefined') < 0) this.options.push(x)
          })
        })
      id1 = id1.split('/')[4]
      axios
        .get(
          'http://127.0.0.1:7001/api/posts/' + id1 + '?user_id=' + localStorage.getItem('id'),
          {},
        )
        .then(res => {
          console.log(res.data)
          this.id = 'Id:' + res.data.id

          this.content = res.data.content
          this.title = res.data.title
          res.data.tags.map(x => {
            this.checked.push(x.id)
          })
          this.options.map(x => {
            if (x.id == res.data.tag) this.value = x.name
          })
        })
        .catch(() => {
          this.$message({ message: 'Lỗi kết n' })
        })
    } else {
      window.location.replace('/')
    }
  },
  methods: {
    updated() {
      let id2 = this.id.split(':')[1]
      const title = this.title
      let content = this.content
      const tags = this.checked

      console.log(tags)
      if (content.length == 0) {
        return this.$message({ message: 'Vui lòng nhập nội dung' })
      }
      if (title.length == 0) {
        return this.$message({ message: 'Vui lòng chọn Tag' })
      } else {
        this.$confirm('Bạn muốn thay đổi ?', 'Xác nhận', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        })
          .then(() => {
            axios
              .patch(
                'http://127.0.0.1:7001/api/posts/' + id2 + '?user_id=' + localStorage.getItem('id'),
                {
                  title: title,
                  content: content,
                  tags: tags,
                },
                {
                  headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
                },
              )
              .then(res => {
                if (res.status == 200) {
                  this.$message({ message: 'Cập nhật thành công' })
                  setTimeout(() => {
                    window.location.replace('/posts')
                  }, 3000)
                } else {
                  this.$message({ message: 'Cập nhật thất bại' })
                }
              })
              .catch(() => {
                this.$message({ message: 'Lỗi kết nối' })
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
  width: 1000px;
  .text-editor {
    margin-top: 30px;
    button {
      background: #fff;
      border: none;
      cursor: pointer;
      &:hover {
        color: #3d65d2;
      }
    }
    select {
      border: none;
      font-size: 17px;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
        Geneva, Verdana, sans-serif;
      cursor: pointer;
      user-select: none;
      /*for firefox*/
      -moz-appearance: none;
      /*for chrome*/
      -webkit-appearance: none;
      appearance: none;
    }
    select::-ms-expand {
      display: none;
    }
  }
   button {
    margin-top: 30px;
  }
}
</style>
