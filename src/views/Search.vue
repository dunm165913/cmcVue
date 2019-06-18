<template>
  <div class="mySite">
    <SiteNav/>
  <div style="height:80px"></div>
    <el-span style="margin-left:150px;font-size:320%;margin-bottom:50px">Kết quả tìm kiếm: {{this.$route.query.name}}</el-span>
    <div style="height:10px"></div>
    <ListPost v-if="this.posts1.length>0" v-bind:posts1="posts1"/>
      <span v-else style="margin-left:43%;color:red;font-size:120%;">Không có kết quả tìm kiếm!!!</span>
    <FooterMySite/>
  </div>
</template>
<script>
import axios from 'axios'
import Nav from '@/components/layout/Nav'
import SiteNav from '@/components/layout/SiteNav'
import FooterMySite from '@/components/layout/FooterMySite'
import ListPost from '@/components/layout/ListPost'
import { constants } from 'fs'
export default {
  name: 'Search',
  components: {
    SiteNav,
    ListPost,
    FooterMySite,
  },
  data() {
    return {
      id: '',
      posts1: [],
    }
  },
  created() {
    axios.get('http://127.0.0.1:7001/api/web?web_name=' + this.$route.params.nameSite).then(res => {
      this.id = res.data

      axios.get('http://127.0.0.1:7001/api/search?name=' + this.$route.query.name).then(res => {
        if (res.data.length != 0) {
          res.data.data.map(x => this.posts1.push(x))
        }
      })
    })
  },
  data() {
    return {
      editableTabsValue2: '',
      username: 'My WebSite',
      nameSite: 'first',
      quote: 'There is only one happiness in this life, to love and be loved.',
      tags: [],
      id: '',
      posts1: [],
    }
  },

  methods: {},
}
</script>
<style lang="scss" scoped>
.result-search {
  font-size: 320%;
  margin-bottom: 100px;
}
ul,
li {
  list-style-type: none;
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
</style>
