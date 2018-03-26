<template>
  <div class="login-wrapper border border-light">
    <form class="form-login" @submit.prevent="login">
      <h2 class="form-login-heading">Please sign in</h2>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <label for="inputUsername" class="sr-only">Username</label>
      <input v-model="username" type="username" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <router-link class="btn btn-lg btn-primary btn-block btn-login" to="/">No account? Sign Up</router-link>
    </form>
    
  </div>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: false
    };
  },
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  created() {
    this.checkCurrentLogin();
  },
  updated() {
    this.checkCurrentLogin();
  },
  methods: {
    login() {
      this.$http
        .post("/auth/login", { username: this.username, password: this.password })
        .then(res => this.loginSuccessful(res))
        .catch(() => this.loginFailed());
    },
    loginSuccessful(res) {
      if (!res.data.auth_token) {
        this.loginFailed();
        return;
      }
      this.error = false;
      localStorage.token = res.data.auth_token;
      this.$store.dispatch("login");
      this.$router.push("/rooms?redirect=" + this.$route.path);
    },
    loginFailed() {
      this.error = "Sign in failed!";
      this.$store.dispatch("logout");
      delete localStorage.token;
    },
    checkCurrentLogin() {
      if (this.currentUser) {
        this.$router.push("/rooms?redirect=" + this.$route.path);
      }
    }
  }
};
</script>

<style lang="css">
body {
  background: #ffffff;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
  animation: fadein 0.6s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.btn-primary {
  color: #fff;
  background-color: #5db7de !important;
  border-color: #5db7de !important;
}
.btn-primary:hover {
  color: #fff;
  background-color: #4D96B6 !important;
  border-color: #4D96B6 !important;
}

.form-login {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-login .form-login-heading,
.form-login .checkbox {
  margin-bottom: 10px;
}
.form-login .checkbox {
  font-weight: normal;
}
.form-login .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-login .form-control:focus {
  z-index: 2;
}
.form-login input[type="username"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-login input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.btn-signup {
  margin-top: 10px;
  text-decoration: none
}
</style>
