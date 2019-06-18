<template>
  <div class="FirstPage">
    <el-row>
      <el-col :span="16"
        ><div class="grid-content bg-purple-dark">
          <h1>Tạo Site  theo phong cách của bạn</h1>
          <span>Bạn đang trên đường tạo Site, hãy bắt đầu nào </span><br />
          <router-link to="/NewTag"
            ><el-button type="primary" round>Tạo Site</el-button><br
          /></router-link>
          <img id="img-firstpage" src="../../assets/webdemo.png" />
          <div class="fter"></div></div
      ></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'FirstPage',
}
</script>
<style lang="scss" scoped>
.FirstPage {
  h1 {
    font-size: 50px;
    margin-top: 70px;
    margin-bottom: 16px;
  }
  span {
    font-size: 18px;
  }
  button {
    margin-top: 30px;
    width: 160px;
    height: 40px;
    font-size: 15px;
  }
  font-family: Georgia, 'Times New Roman', Times, serif;
  text-align: center;
  .fter {
    width: 100%;
    height: 250px;
    background-color: #dcdcdc;
    margin-top: 80px;
  }
}
#img-firstpage{
  margin-top:50px;
  margin-left: 50px;
  height: 400px;
  width: auto;
}
</style>
