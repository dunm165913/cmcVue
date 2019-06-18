<template>
<div>
   <div class="list-post">
          <div v-for="post in posts1" :key="post.id">
            <img />
            <router-link :to="{ path: '/'+nameSite+'/posts/'+'postid'+'/'+post.id}" append><h3>{{ post.title }}</h3></router-link>
            <label><i class="el-icon-time"></i>{{ post.create_at }}</label>
            <button><i class="el-icon-message"></i>Comment now</button>
            <div class="post_content"><p>{{post.content}}</p></div>
          </div>
        </div>
</div>
</template>
<script>
export default {
  name: 'ListPost',
  props:["posts1"],
  data(){
    return {
      nameSite:''
    }
  },
  created(){
    this.nameSite=this.$route.params.nameSite
    console.log(this.post1)
  }

}
</script>
<style lang="scss" scoped>
.list-post{
  width: 80%;
  margin: auto;
  h3{
    font-size: 50px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin: auto;
    margin-top:50px;
    margin-bottom: 20px;
    color: rgb(65, 62, 62);
  }
  label{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 500;
    margin: 0px 10px;
    color:rgb(238, 146, 26);
    i{
      margin-right: 5px;
    }
  }
  button{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 500;
    font-size: 16px;
    margin: 0px 10px;
    color:rgb(238, 146, 26);
    background-color: #fff;
    border: none;
    cursor: pointer;
    i{
      margin-right: 5px;
    }
  }
  .post_content{
    margin: auto;
  }
}
</style>
