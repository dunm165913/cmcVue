<template>
  <div class="footer">
    <div class="tomottoWrap">
      <div id="tomotto">
        “In such seconds of decision entire futures are made.”
  ― Dan Simmons, Hyperion
      </div>
    </div>
    <el-row class="footer_content">
    <el-col :span="24"><div class="grid-content bg-purple" style="border-bottom: 2px solid gray;text-align:center;font-size:20px;
    margin-top:30px;padding-bottom: 30px;">
      Blog tại CMS.com
      </div></el-col>
      <div class="copyright">
        © Copyright 2018 - 2019 Your Company
      </div>
  </el-row>

  </div>
</template>
<script>
export default {
  name: 'FooterMySite'
}
</script>
<style lang="scss" scoped>
.footer{
  font: 12pt Georgia;
  color: #f2f2f2;
  .tomottoWrap{
    position: relative;
    background: #3CA2A2;
    #tomotto{
      text-align: center;
      width: 960px;
      letter-spacing: 2px;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      line-height: 36px;
      margin: auto;
    }
  }
  .footer_content{
    position: relative;
    background-color: #215A6D;
    float: left;
    width: 100%;
  }
  .copyright{
    margin: 1.5%;
    padding-top: 1.5%;
    text-align: center;
  }
}
</style>
