<template>
  <div class="mySite">
    <Nav/>
    <div class="mySite_content">
      <div class="content_nav">
        <div class="menu-container">
          <router-link :to="{ path: '/'+nameSite }" replace>
            <h1>{{ username }}</h1>
          </router-link>
          <ul v-for="tag in tags" :key="tag.id">
            <li class="hovertag" :v-model="tag.id" v-on:click="tab(tag.name,tag.id)">{{ tag.name }}</li>
          </ul>

          <el-input
            @focus="inputsearch=false"
            size="mini"
            v-if="inputsearch"
            style="width:200px; margin-left:100px"
          ></el-input>
          <el-input
            v-if="!inputsearch"
            v-on:keyup.enter.native="searche()"
            size="small "
            style="width:500px; margin-left:100px"
            v-model="search"
          ></el-input>

          <span
            name
            class="dndk"
            v-if="!islogin&&inputsearch"
            style="margin-left:50px"
            v-on:click="loginForm=true"
          >Đăng nhập</span>
          <span
            name
            class="dndk"
            v-if="islogin&&inputsearch"
            style="margin-left:50px"
          >{{user.name}}</span>
          <span
            name
            class="dndk"
            v-if="!islogin&&inputsearch"
            style="margin-left:50px"
            v-on:click="signupForm=true"
          >Đăng ki</span>
          <span
            name
            class="dndk"
            v-if="islogin&&inputsearch"
            style="margin-left:50px"
            v-on:click="logout()"
          >Thoát</span>
        </div>
      </div>

      <div class="content">
        <!-- <div class="front-page"> -->
        <!-- <div class="quote">
            <p>{{ quote }}</p>
        </div>-->
        <el-carousel indicator-position="outside">
          <el-carousel-item interval=1000 v-for="item in page" :key="item.url">
            <div style="margin:0 auto">
              <img :src="item.url">
            </div>
          </el-carousel-item>
        </el-carousel>
        <!-- </div> -->
      </div>
      <el-dialog title="SIGN UP" :visible.sync="signupForm" style="text-align:center;">
        <el-form :model="signup">
          <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input
              style="width:50%;float:left"
              v-model="signup.name"
              autocomplete="off"
              type="text"
            ></el-input>
          </el-form-item>
          <el-form-item label="Email" :label-width="formLabelWidth">
            <el-input
              style="width:50%;float:left"
              v-model="signup.email"
              type="text"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="Password" :label-width="formLabelWidth">
            <el-input
              style="width:50%;float:left"
              v-model="signup.password"
              autocomplete="off"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item label="Repeat Password" :label-width="formLabelWidth">
            <el-input
              style="width:50%;float:left"
              v-model="signup.repeatPS"
              autocomplete="off"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="signupForm = false">Cancel</el-button>
          <el-button type="primary" v-on:click="signuped()">Sign up</el-button>
        </span>
      </el-dialog>
      <el-dialog title="LOGIN" :visible.sync="loginForm" style="text-align:center;">
        <el-form :model="login">
          <el-form-item label="Email" :label-width="formLabelWidth">
            <el-input style="width:50%;float:left" v-model="login.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" :label-width="formLabelWidth">
            <el-input
              style="width:50%;float:left"
              v-model="login.password"
              autocomplete="off"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="loginForm = false">Cancel</el-button>
          <el-button type="primary" v-on:click="logined()">Login</el-button>
        </span>
        <span
          class="regis-acc"
          @click="signupForm = true, loginForm=false"
        >Bạn chưa có tài khoản ? Sign up</span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'SiteNav',
  components: {},
  data() {
    return {
      searche: () => {
        window.location.replace('/' + this.nameSite + '/search?name=' + this.search)
      },
      islogin: false,
      editableTabsValue2: '',
      username: this.$route.params.nameSite,
      nameSite: 'first',
      quote: 'There is only one happiness in this life, to love and be loved.',
      tags: [],
      id: '',
      search: '',
      login: {
        email: '',
        password: '',
      },
      inputsearch: true,
      log: true,
      page: [
        {
          url: 'https://congngheviet.com/wp-content/uploads/2017/02/World___Australia_Beautiful_view_towards_the_Gold_Coast__Australia_058425_-e1486618261817.jpg',
        },
        {
          url: 'https://nguyenhaiblog.com/wp-content/uploads/2018/09/hinh-nen-may-tinh-4k.jpg',
        },
      ],
      signup: {
        email: '',
        password: '',
        repeatPS: '',
        name: '',
      },
      loginForm: false,
      signupForm: false,
      formLabelWidth: '150px',
      user: {},
    }
  },
  created() {
    this.nameSite = this.$route.params.nameSite
    if (this.$route.params.nameTag) this.editableTabsValue2 = this.$route.params.tagId
    axios
      .get('http://127.0.0.1:7001/api/web?web_name=' + this.$route.params.nameSite)
      .then(res => {
        console.log(res.data)
        if (res.data > 0) {
          this.id = res.data
          if (localStorage.getItem('token' + this.id)) this.log = false
          axios.get('http://127.0.0.1:7001/api/tags?web_id=' + this.id).then(res => {
            res.data.map(x => {
              if (x.name != 'undefined') this.tags.push(x)
            })
          })
        } else {
          this.log = undefined
          const loading = this.$loading({
            lock: true,
            text: 'Web không tìm thấy',
            spinner: 'el-icon-error',
            background: 'rgba(0, 0, 0, 0.9)',
          })
        }
      })
      .catch(err => {
        const loading = this.$loading({
          lock: true,
          text: 'Web gặp vấn đề khi tải tài nguyên',
          spinner: 'el-icon-error',
          background: 'rgba(0, 0, 0, 0.9)',
        })
      })
    if (localStorage.getItem(this.nameSite)) {
      this.user = JSON.parse(localStorage.getItem(this.nameSite))

      this.islogin = true
    }
  },
  methods: {
    searching() {
      this.inputsearch = false
    },
    tab(tabname, id) {
      console.log(tabname, id)
      window.location.replace('/' + this.nameSite + '/tags/' + tabname + '/' + id)
    },
    logout() {
      localStorage.removeItem(this.nameSite)
      window.location.reload()
    },
    logined() {
      // this.localStorage= localStorage.getItem('token')
      const email = this.login.email
      const password = this.login.password
      const id_site = this.id

      if (email.length == 0) this.$message({ message: 'Email không hợp lệ' })
      else if (password.length < 6) this.$message({ message: 'Mật khẩu không hợp lệ' })
      else {
        axios
          .post(
            'http://127.0.0.1:7001/api/users/login',
            {
              email: email,
              password: password,
              id_site: id_site,
            },
            {},
          )
          .then(res => {
            console.log(res.data)

            if (res.data.token.length > 0) {
              localStorage.setItem(this.nameSite, JSON.stringify(res.data))
              window.location.reload()
            } else
              this.$message({ message: 'Thông tin bạn nhập không chính xác, vui lòng thử lại' })
          })
          .catch(() => {
            this.$message({ message: 'Lỗi kết nối' })
          })
      }
    },
    signuped() {
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const name = this.signup.name
      const email = this.signup.email
      const password = this.signup.password
      const repeatPS = this.signup.repeatPS
      const id_site = this.id
      if (password.length < 6) {
        return this.$message({ message: 'Mật khẩu dài hơn 5 kí tự' })
      }
      if (regexEmail.test(email.toLowerCase()) == false) {
        return this.$message({ message: 'Email không hợp lệ' })
      }
      if (password != repeatPS) {
        return this.$message({ message: 'Vui lòng nhập lại mật khẩu' })
      }
      if (name.length == 0) {
        return this.$message({ message: 'Vui lòng nhập lại tên' })
      }
      axios
        .post('http://127.0.0.1:7001/api/users', {
          email: email,
          password: password,
          name: name,
          id_site: id_site,
        })
        .then(res => {
          console.log(res);
          if(res.status==200)this.$message({message:"dk thanh cong"})
          else this.$message({message:"vui lòng kiểm tra lại"})
        })
    },
  },
}
</script>
<style lang="scss" scoped>
ul,
li {
  list-style-type: none;
}
ul {
  display: inline-block;
}
.is-top {
  font-size: 20px;
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
.dndk {
  &:hover {
    cursor: pointer;
  }
}

.content {
  margin-top: 25px;
  margin: 0 auto;
  width: 80%;
  .front-page {
    height: 280px;
    width: 80%;
    margin: auto;
    background-image: url('../../assets/quote.jpg');
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
.hovertag {
  &:hover {
    color: aquamarine;
    cursor: pointer;
  }
}
.footer {
  background: rgba(92, 248, 2, 0.836);
  height: 100px;
  text-align: center;
}
.footer-name {
  font-family: 'Courier New', Courier, monospace;
  font-size: 300%;
  line-height: 150%;
}
</style>
