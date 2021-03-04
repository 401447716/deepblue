<template>
  <div class="content" v-if='showBox'>
    <div class="card" v-show="loginBox">
      <!--阶梯-->
      <div class="bg-transparent left"></div>
      <div class="bg-transparent center"></div>
      <div class="bg-transparent right"></div>
      <div class="text">
        <i class="el-icon-close closeBtn" @click="loginBox=false"></i>
        <h1>登录</h1>
        <br><br><br><br>
        <span>用户名:</span>
        <el-input v-model='account' placeholder="account" class="inputBox"></el-input>
        <br><br><br><br>
        <span>密码:</span>
        <el-input type="password" v-model='password' placeholder="password" class="inputBox"></el-input>
        <br><br>
        <div class="checkBox"><el-checkbox v-model="save">自动登录</el-checkbox></div>
        <br><br><br>
        <div class="buttonBox">
          <el-button size="medium" type="primary" @click='login'>登录</el-button>
          <el-button size="medium" @click="openRegist">注册</el-button>
        </div>
      </div>
    </div>

    <el-dialog
      title="注册"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="openRegist">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="用户名" prop="account">
          <el-input v-model.number="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="openRegist">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss" src="./index.scss" scoped></style>
<script src="./index.js"></script>
