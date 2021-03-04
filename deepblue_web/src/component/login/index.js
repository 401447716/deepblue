import bus from '@/component/bus'
export default {
  name: 'login',
  computed: {
  },
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        if (value.length < 6 || value.length > 9) {
          return callback(new Error('用户名请控制在 6 - 9 位'))
        }
      }, 100)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback()
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      account: '',
      password: '',
      save: false,
      dialogVisible: false,
      loginBox: false,
      showBox: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        account: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        account: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    bus.$on('openLogin', () => {
      this.showBox = true
      this.loginBox = true
    })
    bus.$on('loginSuccess', () => {
      this.showBox = false
      this.loginBox = false
    })
  },
  methods: {
    login () {
      this.$emit('login', {
        account: this.account,
        password: this.password,
        save: this.save
      })
    },
    openRegist () {
      this.dialogVisible = !this.dialogVisible
      this.loginBox = !this.loginBox
    },
    submitForm(formName) {
      if(this.ruleForm.account === '' || this.ruleForm.account.length < 6 || this.ruleForm.account.length > 9) {
        this.$message.error('信息填写错误')
        return false
      }
      if (this.ruleForm.pass === '' || this.ruleForm.checkPass === '' || this.ruleForm.pass !== this.ruleForm.checkPass) {
        this.$message.error('信息填写错误')
        return false
      }
      this.regist()
    },
    regist () {
      Api.regist(this.ruleForm.account, this.ruleForm.pass).then(
        res => {
          if (!res.result) {
            this.loginBox = true
            this.dialogVisible = false
            this.$message.success('注册成功')
          } else {
            this.$message.error(res.msg)
          }
        }
      )
    }
  }
}
