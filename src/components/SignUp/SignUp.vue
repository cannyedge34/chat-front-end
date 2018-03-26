<template>
  <div class="signup-wrapper border border-light">
    <form class="form-signup" @submit.prevent="signup">
      <h2 class="form-signup-heading">Please sign up</h2>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <label for="inputUsername" class="sr-only">Username</label>
      <input v-model="username" type="username" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
      <router-link class="btn btn-lg btn-primary btn-block btn-login" to="login">Login if you have an account</router-link>
    </form>
  </div>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SignUp",
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
    this.checkCurrentSignUp();
  },
  updated() {
    this.checkCurrentSignUp();
  },
  methods: {
    signup() {
      this.$http
        .post("/signup", { username: this.username, password: this.password })
        .then(res => this.signupSuccessful(res))
        .catch(() => this.signupFailed());
    },
    signupSuccessful(res) {
      if (!res.data.auth_token) {
        this.signupFailed();
        return;
      }
      this.error = false;
      localStorage.token = res.data.auth_token;
      this.$store.dispatch("signup");
      this.$router.push("/rooms?redirect=" + `${this.$route.path}`);
    },
    signupFailed() {
      this.error = "Sign up failed!";
      this.$store.dispatch("logout");
      delete localStorage.token;
    },
    checkCurrentSignUp() {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || "/rooms");
      }
    }
  }
};
</script>

<style lang="css">
body {
  background: #ffffff;
}

.signup-wrapper {
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
  background-color: #4d96b6 !important;
  border-color: #4d96b6 !important;
}

.form-signup {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signup .form-signup-heading,
.form-signup .checkbox {
  margin-bottom: 10px;
}
.form-signup .checkbox {
  font-weight: normal;
}
.form-signup .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signup .form-control:focus {
  z-index: 2;
}
.form-signup input[type="username"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signup input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.btn-login {
  margin-top: 10px;
}
</style>
