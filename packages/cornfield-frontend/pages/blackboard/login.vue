<template>
  <el-container>
    <el-header>
      <el-menu default-active="0" mode="horizontal">
        <el-menu-item index="0">Login</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <div>
        <el-row>
          <el-col :span="8" :offset="8">
            <el-form ref="ruleForm" :model="form" :rules="rules">
              <el-form-item label="Oruyanke – Oruyanke" prop="passValidator">
                <el-input v-model="form.pass"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">Login</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  layout: 'empty',
  head: {
    title: 'Login'
  },
  data() {
    return {
      form: { pass: '' },
      tryCount: 0,
      rules: {
        passValidator: [{ validator: this.validate, trigger: 'blur' }]
      }
    }
  },
  methods: {
    validate(rule, value, callback) {
      if (this.form.pass === 'value') {
        callback()
        return
      }
      this.tryCount++
      return callback(
        new Error(this.tryCount > 7 ? '中间的“-”代表减号' : '密码错误')
      )
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) this.$router.push('/blackboard/demo')
      })
    }
  }
}
</script>

<style></style>
