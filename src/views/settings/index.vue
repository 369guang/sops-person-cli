<template>
  <div class="settings">
    <el-row>
      <el-col :xs="24" class="settings-level">
        <el-card shadow="hover">
          <div class="level-title">基本信息</div>
          <el-form :model="personalForm" size="default" label-width="40px" class="mt35 mb35">
            <el-row :gutter="35">
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                <el-form-item label="账号">
                  <el-input v-model="personalForm.username" disabled></el-input>
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
              <!--el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <el-form-item>
                  <el-button type="primary">
                    <el-icon>
                      <ele-Position />
                    </el-icon>
                    更新个人信息
                  </el-button>
                </el-form-item>
              </el-col-->
            </el-row>
          </el-form>
        </el-card>
      </el-col>
      <el-col :xs="24" class="settings-level">
        <el-card shadow="hover">
          <div class="level-title">认证</div>
          <el-form :model="authForm" size="default" label-width="40px"  class="mt35 mb35">
            <el-row :gutter="35">
              <el-col :xs="24" class="mb20">
                <el-space fill>
                  <el-form-item label="2FA">
                    <el-radio-group v-model="personalForm.totp">
                      <el-radio :label="2">禁用</el-radio>
                      <el-radio :label="1">启用</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-alert>
                    <p>基于时间的一次性密码 (TOTP) 应用程序会自动生成一个验证码，该验证码会在一段时间后更改</p>
                  </el-alert>
                </el-space>
              </el-col>
              <el-col v-show="personalForm.totp === 1" :xs="24" class="mb20">
                <canvas id="qr-canvas" width="200" height="200"></canvas>
                <p><el-tag type="warning">请使用Authenticator等OTP工具进行记录</el-tag></p>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
      <el-col :xs="24" class="settings-level">
         <el-button type="primary" @click="updateSettings">
            <el-icon>
              <ele-Position />
            </el-icon>
            更新面板信息
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {toRefs, reactive, computed, defineComponent, onMounted} from 'vue';
import {usersApi} from "/@/api/user";
import QRCode from 'qrcode';

export default defineComponent( {
  name: "settings",
  setup() {
    const state = reactive( {
      personalForm: {
        password: '',
        username: '',
        email: '',
        mobile: '',
        totp: 2,
      },
      authForm: {
        id: 0,
        urls: false
      }
    });
    const initData = async () => {
      await usersApi().getInfo({}).then( res => {
        state.personalForm = res.data;
      });
      await usersApi().getAuthToTp().then( res => {
        state.authForm = res.data;
      });
      QRCode.toCanvas(
        document.getElementById('qr-canvas'), 
        state.authForm.urls, 
        { width: 200, height: 200 },
        );
    }
    const updateSettings = async () => {
      await usersApi().updateSettings(state.personalForm).then( res => {
        console.log(res);
      });
    }
    onMounted(() => {
      initData();
    });
    return {
      updateSettings,
      ...toRefs(state)
    };
  }
})
</script>

<style scoped  lang="scss">
@import '../../theme/mixins/index.scss';
.settings {
  .settings-level {
    font-size: 16px;
    margin-top: 8px;
  }
}
</style>