<template>
  <div class="mySite">
    <SiteNav/>
    <div style="margin:0 auto;width:80%">
      <div class="title">
        {{ title }}
        <br>
        <div v-if="this.url.indexOf('.webm')>=0  ||this.url.indexOf('.mp4')>=0 ">
          <video width="600px" controls controlsList="nodownload">
            <source v-bind:src="this.url" type="video/mp4">
          </video>
        </div>
        <div v-else-if="this.url.indexOf('.mp3') >0">
          <audio controls controlsList="nodownload">
            <source v-bind:src="this.url" type="audio/mpeg">
          </audio>
        </div>
        <div v-else>
          <img :src="url">
        </div>
      </div>

      <div class="date">Đăng lúc {{ date }}</div>
      <div class="contentpost" v-html="content"></div>
      <h4 style="margin-left:25%">Bình luận</h4>
      <div class="com">
        <div class="comment">
          <el-input
            v-model="comment"
            placeholder="Viết bình luận của bạn ở đây..."
            type="textarea"
            rows="5"
          ></el-input>
          <div style="width:100%">
            <el-button
              type="primary"
              v-on:click="sendComment()"
              style="float:right; margin:15px"
              round
            >Gui binh luan</el-button>
          </div>
        </div>
      </div>
    </div>
    <div style="height:100px"></div>
    <!-- <div style="margin-left:10%;border:1px; " v-for="comment in commentData" :key="comment.name">
      <div><h1>{{comment.name}}</h1><p>{{comment.comment}}</p></div>
    </div>-->
    <el-table :data="commentData" style="width:50%; margin: 0 auto">
      <el-table-column width="130%" label="Tên" prop="name"></el-table-column>
      <el-table-column label="Bình luận" prop="content"></el-table-column>
    </el-table>
    <FooterMySite/>
  </div>
</template>
<script>
import axios from 'axios'
import Nav from '@/components/layout/Nav'
import SiteNav from '@/components/layout/SiteNav'
import ListPost from '@/components/layout/ListPost'
import FooterMySite from '@/components/layout/FooterMySite'
import { constants } from 'fs'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'PostDetail',
  components: {
    Nav,
    SiteNav,
    ListPost,
    FooterMySite,
  },

  created() {
    this.user = JSON.parse(localStorage.getItem(this.nameSite))

    axios.get('http://127.0.0.1:7001/api/web?web_name=' + this.$route.params.nameSite).then(res => {
      this.id = res.data

      axios
        .get('http://127.0.0.1:7001/api/posts/' + this.$route.params.postId + '?user_id=' + this.id)
        .then(res => {
          if (!res.data.title) this.title = 'Bai viet khong ton tai'
          else {
            console.log(res.data.content)
            this.title = res.data.title
            this.date = res.data.create_at
            this.content = res.data.content
            this.commentData = [...res.data.comments]
            this.url = res.data.image_url.length > 0 ? res.data.image_url : ''
            console.log(this.url)

          }
        })
    })
  },
  data() {
    return {
      commentData: [],
      name: '',
      url: '',
      comment: '',
      username: 'My WebSite',
      nameSite: this.$route.params.nameSite,
      title: '',
      date: '',
      content: '',
      id: '',
      user: {},
    }
  },

  methods: {

    sendComment() {
      let token = ''
      this.user= JSON.parse(localStorage.getItem(this.nameSite))
      try {
        token = this.user.token
      } catch (e) {
        return this.$message({ message: 'Ban can login' })
      }
      let name = this.name
      let comment = this.comment
      let id = this.$route.params.postId

      console.log(token)

      if (comment && id) {
        axios
          .post(
            'http://127.0.0.1:7001/api/comments',
            {
              name: this.user.name,
              content: comment,
              post_id: id,
            },
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            },
          )
          .then(res => {
            if ((res.status = 200)) {
              this.commentData.unshift({
                name: this.user.name,
                content: comment,
              })
              this.$message({ message: 'Bạn đã bình luận thành công' })
              this.name = ''
              this.comment = ''
            }
          })
          .catch(err => {
            this.$message({ message: 'Lỗi kết nối' })
          })
      } else this.$message({ message: 'Vui lòng điển đầy đủ thông tin' })
    },
  },
}
</script>
<style lang="scss" scoped>
ul,
li {
  list-style-type: none;
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
ul {
  display: inline-block;
}
.tag {
  font-size: 200%;
}
.menu-container {
  overflow: hidden;
  h1 {
    float: left;
    margin-left: 50px;
    margin-right: 50px;
    font-size: 60px;
    color: #192930;
  }
  ul {
    margin-top: 5%;
    li {
      font-weight: 600;
      font-size: 20px;
      a {
        color: #a5a29d;
        &:hover {
          color: rgb(24, 23, 23);
        }
      }
    }
  }
}

.content {
  margin-top: 25px;
  width: 1000px;
  .front-page {
    height: 280px;
    width: 80%;
    margin: auto;
    background-image: url('../assets/quote.jpg');
    .quote {
      padding-top: 10px;
      padding-left: 50px;
      padding-right: 70px;
      p {
        color: #fff;
        font-size: 45px;
        font-style: italic;
        font-family: 'Times New Roman', Times, serif;
      }
    }
  }
}
.footer {
  padding-top: 100;

  height: 100px;
  text-align: center;
}
.footer-name {
  font-family: 'Courier New', Courier, monospace;
  font-size: 300%;
  line-height: 150%;
}
.comment {
  width: 50%;
  margin: 0 auto;
}
.com {
  border: 1px;
  border-radius: 10px;
}

.date {
  font-size: 80%;
  color: rgb(255, 145, 0);
}
</style>
