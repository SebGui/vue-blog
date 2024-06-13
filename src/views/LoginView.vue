<template>
  <div class="loginBackground">
    <h1>{{ $t('login.title') }}</h1>
    <span>{{ $t('login.description') }}</span>

    <div :class="size+'Login'">
      <div class="loginContainer">

          <!-- Locale changer -->
          <div class="login-locale-changer">
              <select v-model="$i18n.locale" id="loginLangSelector">
                <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ $t('localeNames.'+locale) }}</option>
              </select>
          </div>

          <!-- Login form -->
          <form v-if="showLogin" @submit.prevent="handleLogin">
              <input type="text" required autofocus :placeholder="$t('user.login.enterLogin')" v-model="login">
              <input type="password" required :placeholder="$t('user.login.enterPassword')" v-model="password">

              <span v-if="error != null" class="loginError">{{ $t('user.login.credMismatch') }}</span>

              <div class="submit">
                  <button>{{ $t('user.login.loginButtonText') }}</button>
              </div>
              <div @click="showCreate = true;showLogin = false;" class="loginSubLinks">{{ $t('user.login.createAccount') }}</div>
          </form>

          <!-- Create form -->
          <form v-if="showCreate" @submit.prevent="handleCreate">
              <input type="text" required autofocus :placeholder="$t('user.register.createLogin')" v-model="cLogin">
              <input type="password" required :placeholder="$t('user.register.createPassword')" v-model="cPassword">
              <input type="password" required :placeholder="$t('user.register.createConfirmPassword')" v-model="cConfirmPassword">

              <span v-if="cError != null" class="loginError">{{ cError }}</span>
              <span v-if="showCreateSentence" class="createSentence">{{ $t('user.register.createdAccount') }} {{ timeToRedirect }}{{ $t('user.register.secondAndDots') }}</span>

              <div class="submit">
                  <button>{{ $t('user.register.createButtonText') }}</button>
              </div>
              <div @click="showCreate = false;showLogin = true;" class="loginSubLinks">{{ $t('user.login.logIn') }}</div>
          </form>
      </div>
    </div>

    <CubeBackground cubesAmount="8"/>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import { useI18n } from 'vue-i18n'

import cfg from '../../config.js'
import md5 from '../composables/utils/md5.min'
import idGenerator from '../composables/utils/idGenerator'
import getUser from '../composables/user/getUser'
import addUser from '../composables/user/addUser'
import updateUser from '../composables/user/updateUser'
import CubeBackground from '../components/subcomponents/CubeBackground.vue'

export default {
    props: ['size'],
    emits: ['loggedIn'],
    components : {CubeBackground},
    setup(props, ctx) {
        /* Translation object */
        const {t} = useI18n();

        /* Conditional redering variables */
        const showLogin = ref(true);
        const showCreate = ref(false);

        /* Login refs */
        const login = ref("");
        const password = ref("");

        /* Create refs */
        const cLogin = ref("");
        const cPassword = ref("");
        const cConfirmPassword = ref("");
        const showCreateSentence = ref(false);

        /* Error refs */
        const error = ref(null);
        const cError = ref(null);

        /* Additionnal varaible */
        const timeToRedirect = ref(cfg.timeToRedirectCreation);

        /* Cookie object */
        const $cookies = inject('$cookies');

        /* Login handlers */
        const handleLogin = () => {
            const {user, resquestError, load} = getUser(login.value);

            load((user) => loginValidation(user));
        }

        const loginValidation = (user) => {
            if (login.value == user.id && md5(cfg.salt + password.value) == user.password) {
                createAccessToken();
                ctx.emit('loggedIn', true);
            } else {
                error.value = t("user.login.credMismatch");
            }
        }

        /* AccessToken manager */
        const createAccessToken = () => {
            const accessToken = idGenerator(64);

            // Set cookies
            $cookies.set('token', accessToken);
            $cookies.set('userId', login.value);

            //Save session to DB
            const {status, error2, update} = updateUser({id: login.value, token: accessToken, lastLoggedIn: new Date().getTime()});
            update();
        }

        /* Account creation handlers */
        const handleCreate = () => {
            if (cPassword.value !== cConfirmPassword.value) {
                cError.value = t('user.register.createPasswordMismatch');
                return;
            }

            // Check if user exists before create, do create in doesUserExist callback
            const {user, error, load} = getUser(cLogin.value);
            load((user) => doesUserExist(user), "create");
        }

        const doesUserExist = (user) => {
            if (user != undefined) {
                cError.value = t('user.register.accountExists');
            } else {
                const {user, error, saveUser} = addUser({login: cLogin.value, password: md5(cfg.salt + cPassword.value)});
                saveUser();

                cError.value = null;
                showCreateSentence.value = true;

                // Reset form and redirect to login view
                const createInterval = setInterval(function() {
                    timeToRedirect.value--;
                    if (timeToRedirect.value == -1) {
                        timeToRedirect.value = 3;
                        showCreate.value = false;
                        showLogin.value = true;
                        showCreateSentence.value = false;
                        cLogin.value = "";
                        cPassword.value = "";
                        cConfirmPassword.value = "";

                        clearInterval(createInterval);
                    }
                }, 1000);
            }
        }
        return {
            showLogin, showCreate, login, password, cLogin, cPassword, cConfirmPassword, error, cError, showCreateSentence, timeToRedirect,
            handleLogin, handleCreate
        }
    }
}
</script>

<style>
    /* Large CSS */
    .largeLogin {
        position: relative;
        width: 50%;
        margin-left: 25%;
        margin-top: 100px;
        float: left;
        border: 1px solid lightgray;
        border-radius: 5px;
        box-shadow: #3ca576 5px 5px 5px;
        background-color: white;
        z-index: 11;
    }
    .largeLogin input, .mediumLogin input{width: 50%;margin: 20px;}
    .largeLogin .submit{margin-top:20px;}

    /* Medium CSS */
    .mediumLogin {
        position: relative;
        width: 80%;
        margin-left: 10%;
        margin-top: 160px;
        float: left;
        border: 1px solid lightgray;
        border-radius: 5px;
        box-shadow: #3ca576 5px 5px 5px;
        background-color: white;
        z-index: 11;
    }
    .mediumLogin .submit{margin-top:20px;}
    .mediumLogin .submit button{margin-top:20px;margin-bottom:35px;width:60%;}

    /* Small CSS */
    .smallLogin {
        position: relative;
        width: 99%;
        margin-left: 0;
        margin-top: 160px;
        float: left;
        border: 1px solid lightgray;
        border-radius: 5px;
        box-shadow: #3ca576 5px 5px 5px;
        background-color: white;
        z-index: 11;
    }
    .smallLogin input {width: 80%;margin: 60px 20px 20px 20px;}
    .smallLogin .submit{margin-top:20px;}
    .smallLogin .submit button{margin-top:40px;margin-bottom:50px;width:80%;}

    /* Forms CSS */
    .login-locale-changer {position: absolute;right: 0;}
    .loginError {color: red;float: left;position: relative;display: block;width: 100%;bottom: 10px;font-size: 12px;}
    .loginContainer button {margin-bottom:20px;}
    .loginSubLinks {font-size:14px;color:#3ca576;cursor:pointer;margin-bottom:10px;}
    .createSentence {color: green;display: block;font-size: 14px;}

    /* Background related */
    .loginBackground h1 {text-shadow: 1px 1px #e7e7e7;}
    .loginBackground span {display: block;}
    .loginBackground {
      position: fixed;
      height: 100vh;
      width: 100vw;
      top: 0px;
      left: 0px;
      background: linear-gradient(-45deg, white, #3ca576a6, #d6d6d6, #23d5ab);
      background-size: 400% 400%;
      animation: gradient 10s ease infinite;
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>