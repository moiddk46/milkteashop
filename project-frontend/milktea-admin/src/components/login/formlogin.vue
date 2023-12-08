<template>
  <div>
      <div class="border border-light bg-warning p-5 rounded w-50 row m-auto">

        <h5 class="text-center mb-5 fw-bold fs-3">Đăng nhập</h5>
        <div class="d-flex justify-content-center">
          <form @submit.prevent="submit">
            <div class="input-group">
              <input
                type="email"
                v-model="data.email"
                class="form-control input_user"
                placeholder="E-mail"
              />
            </div>
            <span
              v-if="error.emailEmpty"
              class="text-danger"
              style="font-size: 13px"
            >
              <i class="fa-solid fa-triangle-exclamation"></i> Email không để
              trống!
            </span>

            <div class="input-group mt-3">
              <input
                type="password"
                v-model="data.password"
                class="form-control input_pass"
                placeholder="Password"
              />
            </div>
            <span
              v-if="error.loginFail"
              class="text-danger"
              style="font-size: 13px"
            >
              <i class="fa-solid fa-triangle-exclamation"></i> Email hoặc mật
              khẩu không đúng!
            </span>
            <div class="d-flex justify-content-center mt-3">
              <button type="submit" class="btn btn-primary">Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
<script>
// import authService from "@/services/auth.service";
import login from "@/services/login";
export default {
  data() {
    return {
      data: {},
      error: {},
    };
  },

  methods: {
    async submit() {
      if (!this.data.email) {
        this.error.emailEmpty = true;
      } else {
        this.error.emailEmpty = false;
      }

      if (!this.data.password) {
        this.error.passwordEmpty = true;
      } else {
        this.error.passwordEmpty = false;
      }

      if (!this.error.emailEmpty && !this.error.password) {
        try {
          this.error.loginFail = false;
          await login
            .login(this.data.email, this.data.password)
            .then((result) => {
              if (result) {
                const user = result[0];
                localStorage.setItem("login", user["email"]);
                window.location.href = "/";
              }
            });
        } catch (error) {
          console.log(error);
          this.error.loginFail = true;
        }
      }
    },
  },
};
</script>
<style scoped>
.user_card {
  height: 400px;
  width: 350px;
  margin-top: auto;
  margin-bottom: auto;
  background: #555350;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}

.brand_logo_container {
  position: absolute;
  height: 170px;
  width: 170px;
  top: -75px;
  border-radius: 50%;
  background: #60a3bc;
  padding: 10px;
  text-align: center;
}

.brand_logo {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 2px solid white;
}

.form_container {
  margin-top: 100px;
}

.login_btn {
  width: 100%;
  background: #c0392b !important;
  color: white !important;
}

.login_btn:focus {
  box-shadow: none !important;
  outline: 0px !important;
}

.login_container {
  padding: 0 2rem;
}

.input-group-text {
  background: #c0392b !important;
  color: white !important;
  border: 0 !important;
  border-radius: 0.25rem 0 0 0.25rem !important;
}

.input_user,
.input_pass:focus {
  box-shadow: none !important;
  outline: 0px !important;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #c0392b !important;
}
</style>
