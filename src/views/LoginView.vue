<template>
  <h1>{{ $t('login.title') }}</h1>
  <span>{{ $t('login.description') }}</span>

  <div :class="size+'Login'">
    <div class="loginContainer">

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
</template>

<script>
import cfg from '../../config.js'
import md5 from '../composables/utils/md5.min'
import idGenerator from '../composables/utils/idGenerator'
import getUser from '../composables/user/getUser'
import addUser from '../composables/user/addUser'
import updateUser from '../composables/user/updateUser'

import {useRoute} from 'vue-router'
import {computed} from 'vue'

export default {
    props: ['size'],
    emits: ['loggedIn'],
    setup() {
        const route=useRoute();
        const path = computed(() =>route)
        return {path}
    },
    data() {
        return {
            showLogin : true,
            showCreate: false,
            login : "",
            password : "",
            cLogin : "",
            cPassword : "",
            cConfirmPassword: "",
            error : null,
            cError : null,
            timeToRedirect: 3,
            showCreateSentence: false,
            test: location
        }
    },
    methods: {
        handleLogin() {
            //console.log("HandleLogin");
            const {user, error, load} = getUser(this.login);

            this.error = error;
            load((user) => this.loginValidation(user));
        },
        loginValidation(user) {
            if (this.login == user.id && md5(cfg.salt + this.password) == user.password) {
                //Success
                this.createAccessToken();
                this.$emit('loggedIn', true);
            } else {
                //console.log("failure");
                //Failure
            }
        },
        createAccessToken() {
            const accessToken = idGenerator(64)

            this.$cookies.set('token', accessToken);
            this.$cookies.set('userId', this.login);

            //Save session to DB
            const {status, error2, update} = updateUser({id: this.login, token: accessToken, lastLoggedIn: new Date().getTime()});
            update();
        },
        handleCreate() {
            if (this.cPassword !== this.cConfirmPassword) {
                this.cError = this.$t('user.register.createPasswordMismatch')
                return;
            }
            const {user, error, load} = getUser(this.cLogin);
            load((user) => this.doesUserExist(user), "create");
        }, 
        doesUserExist(user) {
            if (user != undefined) {
                this.cError = this.$t('user.register.accountExists')
            } else {
                const {user, error, saveUser} = addUser({login: this.cLogin, password: md5(cfg.salt + this.cPassword)});
                saveUser();
                //Show created and redirect to login
                this.cError = null;
                this.showCreateSentence = true;
                let self = this;

                const createInterval = setInterval(function() {
                    self.timeToRedirect--;
                    if (self.timeToRedirect == -1) {
                        self.timeToRedirect = 3;
                        self.showCreate = false;
                        self.showLogin = true;
                        self.showCreateSentence = false;
                        self.cLogin = "";
                        self.cPassword = "";
                        self.cConfirmPassword= "";

                        clearInterval(createInterval);
                    }
                }, 1000);
            }
        }
        
    },
    mounted() {
    }
}
</script>

<style>
    .largeLogin, .mediumLogin {
        position: relative;
        width: 50%;
        margin-left: 25%;
        margin-top: 100px;
        float: left;
        border: 1px solid lightgray;
        border-radius: 5px;
        box-shadow: #3ca576 5px 5px 5px;
    }
    .largeLogin input, .mediumLogin input{
        width: 50%;
        margin: 20px;
    }
    .largeLogin .submit{
        margin-top:20px;
    }
    .mediumLogin {
        position: relative;
        width: 80%;
        margin-left: 10%;
        margin-top: 160px;
        float: left;
        border: 1px solid lightgray;
        border-radius: 5px;
        box-shadow: #3ca576 5px 5px 5px;
    }
    .mediumLogin .submit{
        margin-top:20px;
    }
    .mediumLogin .submit button{
        margin-top:20px;
        margin-bottom:35px;
        width:60%;
    }
    .smallLogin {
        position: relative;
        width: 99%;
        margin-left: 0;
        margin-top: 160px;
        float: left;
        border: 1px solid lightgray;
        border-radius: 5px;
        box-shadow: #3ca576 5px 5px 5px;
    }
    .smallLogin input {
        width: 80%;
        margin: 60px 20px 20px 20px;
    }
    .smallLogin .submit{
        margin-top:20px;
    }
    .smallLogin .submit button{
        margin-top:40px;
        margin-bottom:50px;
        width:80%;
    }

    .login-locale-changer {position: absolute;right: 0;}
    .loginError {color: red;
    float: left;
    position: relative;
    display: block;
    width: 100%;
    bottom: 10px;
    font-size: 12px;}
    .loginContainer button {margin-bottom:20px;}
    .loginSubLinks {font-size:14px;color:#3ca576;cursor:pointer;margin-bottom:10px;}
    .createSentence {color: green;    display: block;    font-size: 14px;}
</style>