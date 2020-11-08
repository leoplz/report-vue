<template>
  <div class="login_container">
    <div class="form_content">
      <div id="header">
        <div id="title">风险引擎</div>
        <div id="logo"></div>
      </div>

      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="loginForm"
      >
        <el-form-item label="用户名" prop="username" id="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" id="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="pin" id="pin" v-if="needPin">
          <el-input v-model.number="loginForm.pin"></el-input>
        </el-form-item>
        <div class="submit">
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    var checkPin = (rule, value, callback) => {
      console.log("检查验证码");
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 8 || value.length > 16) {
          callback(new Error("密码长度不合规,应为8 ~ 16 位！"));
        }

        callback();
      }
    };

    var ifadmin = (rule, value, callback) => {
      value = value.replace(/\s+/g, "");
      if (value === "") {
        callback(new Error("请输入有效账号！"));
        return;
      }
      if (value.indexOf("admin") !== -1) {
        callback(new Error("用户名违规！"));
      }
      callback();
    };
    return {
      needPin: false,
      loginForm: {
        username: "",
        password: "",
        pin: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: ifadmin, trigger: "blur" }],
        pin: [{ validator: checkPin, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loginForm.password = this.$md5(this.loginForm.password + this.$config.md5_salt);
          const result = await this.$http.post(
            this.$config.report_back_url +
              ":" +
              this.$config.report_back_core_port +
              "/login",
            this.loginForm
          );
          console.log(result);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style lang="less" scoped>
.submit {
  padding-bottom: 20px;
}
.el-input {
  width: 250px;
}
#header {
  padding-top: 20px;
  width: 100%;
  height: 50px;
}
#title {
  line-height: 45px;
  font-size: 30px;
  height: 100%;
  display: inline-block;
  width: 200px;
}
#logo {
  width: 60px;
  height: 50px;
  background: url("../../assets/img/logo.png") no-repeat;
  background-size: 60px;
  display: inline-block;
  position: absolute;
}
#username {
  padding-top: 20px;
}
.login_container {
  background: #2b4b6b;
  height: 100%;
  width: 100%;
}
.form_content {
  position: absolute;
  border-radius: 20px;
  right: 200px;
  top: 200px;
  height: auto;
  width: 400px;
  background: white;
}
</style>