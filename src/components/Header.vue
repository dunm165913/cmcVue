<template>
  <div class="header">
    <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#00ffff">
      <el-menu-item index="/1" id="logo">
        <router-link to="/" title="Logo CMS">CMS</router-link>
      </el-menu-item>
      <el-menu-item index="/2">
        <router-link to="/" title="Home page">Home</router-link>
      </el-menu-item>
      <el-menu-item index="/3">
        <router-link to="/" title="About page">About</router-link>
      </el-menu-item>

      <el-menu-item index="/4" class="fr" v-if="localStorage == null">
        <el-button type="text" @click="signupForm = true" title="Sign up" class="btn">Sign up</el-button>
      </el-menu-item>
      <el-menu-item index="/5" class="fr" v-if="localStorage == null">
        <el-button type="text" @click="loginForm = true" title="Login" class="btn">Login</el-button>
      </el-menu-item>
    </el-menu>
    <el-dialog title="SIGN UP" :visible.sync="signupForm" style="text-align:center;">
      <el-form :model="signup">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="signup.name" autocomplete="off" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="signup.email" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input v-model="signup.password" autocomplete="off" type="password"></el-input>
        </el-form-item>

        <el-form-item label="Repeat Password" :label-width="formLabelWidth">
          <el-input v-model="signup.repeatPS" autocomplete="off" type="password"></el-input>
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
          <el-input v-model="login.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input v-model="login.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginForm = false">Cancel</el-button>
        <el-button type="primary" v-on:click="logined()">Login</el-button>
      </span>
      <span class="regis-acc"  @click="signupForm = true" >Bạn chưa có tài khoản ? Sign up</span>
    </el-dialog>
    <div class="welcome">
      <div class="quotes">
        <h1>The Best Place to Create Your Website You Want</h1>
        <el-button @click="loginForm = true" title="Login" round>Get Started</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { setTimeout } from 'timers'
export default {
  name: 'Header',
  data() {
    return {
      localStorage: localStorage.getItem('token'),
      loginForm: false,
      signupForm: false,
      login: {
        email: '',
        password: '',
      },
      signup: {
        email: '',
        password: '',
        repeatPS: '',
        name: '',
      },
      formLabelWidth: '150px',
    }
  },
  created() {
    if (localStorage.getItem('token') != null) window.location.replace('/dashboard')
  },
  methods: {
    logined() {
      // this.localStorage= localStorage.getItem('token')
      const email = this.login.email
      const password = this.login.password

      if (email.length == 0) this.$message({ message: 'Email không hợp lệ' })
      else if (password.length < 6) this.$message({ message: 'Mật khẩu không hợp lệ' })
      else {
        axios
          .post(
            'http://127.0.0.1:7001/api/admin/login',
            {
              email: email,
              password: password,
            },
            {},
          )
          .then(res => {
            console.log(res.data)

            if (res.data.token.length > 0) {
              if (localStorage.getItem('token')) localStorage.clear()
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('id', res.data.id)
              localStorage.setItem('name', res.data.name)
              window.location.reload()
            } else this.$message({ message: 'Thông tin bạn nhập không chính xác, vui lòng thử lại' })
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
      if (password.length < 6) {
        return this.$message({ message: 'Mật khẩu dài hơn 5 kí tự' })
      }
      if (regexEmail.test(email.toLowerCase()) == false) {
        return this.$message({ message: 'Email không hợp lệ' })
      }
      if (password != repeatPS) {
        return this.$message({ message: 'Vui lòng nhập lại mật khẩu' })
      }
    if(name.length==0){
        return this.$message({ message: 'Vui lòng nhập lại tên' })
      }
      axios
        .post('http://127.0.0.1:7001/api/admins', {
          email: email,
          password: password,
          username: name,
        })
        .then(res => {
          if (res.status != 200) {
            this.$message({ message: 'Có lỗi xảy ra với thông tin bạn nhập, vui lòng thử lại' })
          } else {
            this.$message({ message: 'Đăng ki thành công' })
            console.log(email + '   ' + password)
            setTimeout(() => {}, 2000)
            axios
              .post(
                'http://127.0.0.1:7001/api/admin/login',
                {
                  email: email,
                  password: password,
                },
                {},
              )
              .then(res => {
                console.log(res.data)
                if (res.data.token.length > 0) {
                  if (localStorage.getItem('token')) localStorage.clear()
                  localStorage.setItem('token', res.data.token)
                  localStorage.setItem('id', res.data.id)
                  localStorage.setItem('name', res.data.name)
                  window.location.reload()
                } else this.$message({ message: 'Thong tin ban nhap ko chinh xac' })
              })
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
#logo {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 40px;
}

.header {
  width: 100%;
  background-image: url('../assets/head.jpg');
  .el-menu-demo {
    background: none;
    &:hover {
      background-color: #f2eaea;
    }
    .fr {
      float: right;
    }
    .input {
      border-radius: 25px;
    }
    .btn {
      color: #939191;
      &:hover {
        color: #000;
      }
    }
  }
  .welcome {
    width: 100%;
    .quotes {
      width: 650px;
      height: 600px;
      background-image: url('../assets/idea2.jpg');
      margin: 100px 300px 0 26%;
      h1 {
        text-align: center;
        font-size: 3.5em;
        padding-top: 50px;
      }
      button {
        margin-left: 250px;
        font-size: 20px;
      }
    }
  }
}
.regis-acc{
  margin-left: 100px;
  &:hover{
    color: aqua;
    cursor: pointer;
  }
}
</style>
