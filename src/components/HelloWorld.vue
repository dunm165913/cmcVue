<template>
  <div class="hello">
    <el-row class="introduction">
      <el-col :span="12"
        ><div class="grid-content bg-purple"><h2>The Freedom to Create Anything</h2></div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple-light">
          <p>
            We believe anything is possible with the right website builder. Whether you're about to
            create a website for the first time or you're a long time pro, we've got you covered.
            You have two ways to start: Get a free website designed for you with CMS or get total
            design freedom with the CMS Editor. You can always add advanced functionality to your
            website with CMS Code. It’s time to get your professional website.
          </p>
        </div></el-col
      >
    </el-row>
    <el-row class="team">
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark"><h2>Team Members CMS</h2></div></el-col
      >

      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <div class="member member1"></div>
            <div class="member-infor">
              <img class="member-img" style="" src="../assets/lan_ava.jpg" />
              <h3>Thùy Lan</h3>
              <span>Front-end deverloper</span>
              <p>
                Nếu debug là quá trình loại bỏ bug trong phần mềm thì code là quá trình gây ra bug.
              </p>
            </div>
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            <div class="member member2"></div>
            <div class="member-infor">
              <img class="member-img" style="" src="../assets/thanh_ava.jpg" />
              <h3>Thành</h3>
              <span>Back-end deverloper</span>
              <p>
                Cho người ta một phần mềm, bạn sẽ làm họ bực mình một ngày. Dạy người ta lập trình,
                bạn sẽ làm họ bực mình cả đời.
              </p>
            </div>
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <div class="member member3"></div>
            <div class="member-infor">
              <img class="member-img" style="" src="../assets/du_ava.jpg" />
              <h3>Dư Nguyễn</h3>
              <span>Full-Stack deverloper</span>
              <p>
                Debug là công việc khó gấp đôi code. Nếu bạn viết code thông minh quá mức, bạn sẽ
                không đủ thông minh để debug nó.
              </p>
            </div>
          </div></el-col
        >
      </el-row>
    </el-row>

    <div class="footer">
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <h1>CMS</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever.
            </p>
            <ul>
              <li><i class="el-icon-phone"></i>0123456789</li>
              <li><i class="el-icon-time"></i>Mon - Sat 8.00 - 18.00</li>
            </ul>
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            <h2>Team Members</h2>
            <ul>
              <li><i class="el-icon-caret-right"></i>Thùy Lan</li>
              <li><i class="el-icon-caret-right"></i>Nguyễn Văn Thành</li>
              <li><i class="el-icon-caret-right"></i>Dư Nguyễn</li>
              <li><i class="el-icon-caret-right"></i>Quốc Anh (mentor)</li>
              <li><i class="el-icon-caret-right"></i>Nguyễn Xuân Thành (mentor)</li>
            </ul>
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <h2>Organization</h2>
            <ul>
              <li><i class="el-icon-star-on"></i>Bamboo Kids</li>
              <li><i class="el-icon-location"></i>Hanoi University of Science and Technology</li>
            </ul>
          </div></el-col
        >
      </el-row>

      <el-row class="footer-b">
        <el-col :span="24"
          ><div style="margin-top:15px;" class="grid-content bg-purple-dark">
            <span>© 2019 CMS All Rights Reserved.</span>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
}
</script>

<style lang="scss" scoped>
.introduction {
  h2 {
    margin: 150px 80px 150px 80px;
    font-size: 70px;
  }
  p {
    margin: 100px;
    font-size: 20px;
    line-height: 2;
  }
}
.team {
  border-top: 5px black solid;
  h2 {
    margin: 100px;
    text-align: center;
    font-size: 70px;
  }
  .member {
    height: 200px;
    width: 350px;
    margin: auto;
  }
  .member-infor {
    background-color: #141414;
    width: 350px;
    margin: auto;
    height: 300px;
    h3 {
      color: rgba(255, 255, 255, 0.877);
      margin-left: 50px;
    }
    span {
      color: rgb(37, 67, 201);
      margin-left: 50px;
      font-size: 13px;
    }
    p {
      color: rgba(255, 255, 255, 0.877);
      margin-left: 50px;
      margin-right: 20px;
      line-height: 2;
      font-family: Arial, Helvetica, sans-serif;
    }
    .member-img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      margin: -60px 0px 0px 30px;
      border: 4px #fff solid;
    }
  }
  .member1 {
    background-image: url('../assets/lan_bg.jpg');
  }
  .member2 {
    background-image: url('../assets/thanh_gb.jpg');
  }
  .member3 {
    background-image: url('../assets/du_bg.jpg');
  }
}
.footer {
  background-color: #33d8d8;
  margin-top: 100px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  h1,
  h2 {
    margin-left: 10%;
    margin-top: 40px;
  }
  p {
    margin: 4% 13%;
    line-height: 1.5;
  }
  li {
    list-style-type: none;
    line-height: 3;
    margin-left: 3%;
    i {
      margin-right: 10px;
    }
  }
  .footer-b {
    border-top: 2px #fff solid;
    height: 50px;
    span {
      margin-left: 3%;
    }
  }
}
</style>
