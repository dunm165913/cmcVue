<template>
  <div>
    <Nav/>
    <div>
      <SideBar style="float:left"/>
      <div class="newPost" style="float:right;margin-right:5%">
        <h2>Tạo bài viết mới</h2>
        <el-input placeholder="Post Name ..." v-model="input" style="width:500px;"></el-input>
        <br>
        <br>
        <el-checkbox-group v-model="checked">
          <el-checkbox v-for="city in options" :label="city.id" :key="city.id">
            {{
            city.name
            }}
          </el-checkbox>
        </el-checkbox-group>
        <br>
        <br>
        <div>
          <vue-editor v-model="content"></vue-editor>
          <!-- <div v-html="content"></div> -->
        </div>
        <!--
      <el-input
        type="textarea" v-on:keyup.enter="addbr"
        placeholder="Write some thing ..."
        v-model="textarea"
        rows="7"
        style="width:900px;"
      ></el-input>
        <br>-->
        <br>
        <input
          type="file"
          v-on:change="upload($event.target.files)"
          placeholder="Vui long chon anh"
        >
        <br>
        <br>
        <el-button type="primary" v-on:click="creatpost()">Create</el-button>
        <el-button type="primary" v-on:click="centerDialogVisible=true">LiveView</el-button>
      </div>
    </div>
    <el-dialog title="Live" :visible.sync="centerDialogVisible" width="70%" center>
      <div class="title">{{this.input}}</div>
      <div style="margin-left:100px">
        <div v-if="this.url_img.indexOf('.webm')>=0  ||this.url_img.indexOf('.mp4')>=0 ">
          <video width="600px" controls>
            <source v-bind:src="this.url_img" type="video/mp4">
          </video>
        </div>
        <div v-else-if="this.url_img.indexOf('.mp3') >0">
          <audio controls>
            <source v-bind:src="this.url_img" type="audio/mpeg">
          </audio>
        </div>
        <div v-else>
          <img :src="this.url_img">
        </div>
      </div>
      <div v-html="content"></div>
    </el-dialog>
  </div>
</template>
<script>
import Nav from '@/components/layout/Nav'
import SideBar from '@/components/layout/SideBar'
import axios from 'axios'
import { setTimeout } from 'timers'
import { constants } from 'fs'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'NewPost',
  components: {
    Nav,
    SideBar,
    VueEditor,
  },
  data() {
    return {
      input: '',
      checked: [],
      options: [],
      value: '',
      textarea: '',
      file: null,
      url_img: '',
      add: '<p>',
      content: '',
      centerDialogVisible: false,
    }
  },
  computed: {
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/dunguyen/video/upload`
    },
  },
  created() {
    document.getElementsByClassName('ql-toolbar')

    axios
      .get('http://127.0.0.1:7001/api/tags?web_id=' + localStorage.getItem('id'))
      .then(res => {
        res.data.map(x => {
          console.log(x.name.indexOf('undefined'))
          if (x.name != 'undefined') this.options.push(x)
          else this.checked.push(x.id)
        })
      })
      .catch(() => {
        this.$message({ message: 'Lỗi kết nối' })
      })
  },
  methods: {
    creatpost() {
      const title = this.input
      // let content = "<p>"+this.textarea+"</p>"
      let image_url = this.url_img
      let content = this.content
      const tag_id = this.checked
      // content=content.replace(/\n/g,"</p><br><p>")
      //neu muon dua ve arr =>{id,id,...}

      console.log(content)
      if (!title) {
        return this.$message({ message: 'Title không được trống' })
      }
      if (!tag_id) {
        return this.$message({ message: 'Tag bài viết không được trống' })
      }
      if (!content) {
        return this.$message({ message: 'Nội dung không được trống' })
      }
      const loading = this.$loading({
        lock: true,
        text: 'Đang đăng bài',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      axios
        .post(
          'http://127.0.0.1:7001/api/posts' + '?user_id=' + localStorage.getItem('id'),
          {
            title: title,
            content: content,
            tags: tag_id,
            image_url: this.url_img_img,
          },
          {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
          },
        )
        .then(res => {
          if (res.status != 200) {
            loading.close()
            this.$message({ message: 'Có lỗi xảy ra, vui lòng thử lại' })
          } else {
            setTimeout(() => {
              loading.close()
              this.$message({ message: 'Tạo bài thành công' })
            }, 100)
            setTimeout(() => {
              window.location.replace('/posts')
            }, 3000)
          }
        })
        .catch(() => {
          loading.close()
          this.$message({ message: 'Lỗi kết nối' })
        })
    },
    upload: function(file) {
      let cloudinary = {
        uploadPreset: 'cc2rmml1',
        apiKey: '384762415366912',
        cloudName: 'dunguyen',
      }
      const formData = new FormData()
      formData.append('file', file[0])
      formData.append('upload_preset', cloudinary.uploadPreset)
      formData.append('tags', 'gs-vue,gs-vue-uploaded')
      // For debug purpose only
      // Inspects the content of formData

      let url_host = 'https://api.cloudinary.com/v1_1/dunguyen/image/upload'
      // console.log(file[0].type)
      if (file[0].type.indexOf('video') >= 0)
        url_host = 'https://api.cloudinary.com/v1_1/dunguyen/video/upload'
      else if (file[0].type.indexOf('mp3') >= 0)
        url_host = 'https://api.cloudinary.com/v1_1/dunguyen/video/upload'

      console.log(file)
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
      this.$confirm('Bạn muốn chọn media này làm đại diện cho bài viết?', 'Xác nhận', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Đang tải lên ',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        axios
          .post(url_host, formData)
          .then(res => {
            loading.close()
            this.url_img_img = res.data.secure_url
          })
          .catch(err => {
            setTimeout(() => {
              loading.close()
              this.$message({ message: 'Lỗi kết nối' })
            }, 500)
          })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
i {
  display: block;
}
.title {
  font-size: 300%;
  text-align: center;
  font-size: 50px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 20px;
  color: rgb(65, 62, 62);
}
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
}
.fileup {
  padding: 20px 0 0 0;
  width: 500px;
}
.tool {
  height: 60px;
}
</style>
