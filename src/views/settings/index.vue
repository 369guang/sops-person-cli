<template>
  <div class="settings">
    <el-row>
      <el-col :xs="24" class="settings-top">
        <el-card shadow="hover">
          <div class="personal-edit-title">基本信息</div>
          <el-form :model="personalForm" size="default" label-width="40px" class="mt35 mb35">
            <el-row :gutter="35">
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                <el-form-item label="昵称">
                  <el-input v-model="personalForm.username" disabled placeholder="请输入昵称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                <el-form-item label="邮箱">
                  <el-input v-model="personalForm.email" placeholder="请输入邮箱" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                <el-form-item label="手机">
                  <el-input v-model="personalForm.mobile" placeholder="请输入手机" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item>
                  <el-button type="primary">
                    <el-icon>
                      <ele-Position />
                    </el-icon>
                    更新个人信息
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, defineComponent } from 'vue';

export default defineComponent( {
  name: "settings",
  setup() {
    const state = reactive( {
      personalForm: {
        username: '',
        email: '',
        mobile: ''
      }
    } );
    return {
      ...toRefs(state)
    };
  }
})
</script>

<style scoped>

</style>