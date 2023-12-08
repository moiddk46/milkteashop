<template>
  <form
    @submit.prevent="submit"
    class="border border-light rounded w-25 bg-warning p-5 m-auto"
  >
    <h5 class="text-center fw-bold fs-2 mb-5">Đăng nhập</h5>
    <div class="form-outline mb-4">
      <label class="form-label" for="form2Example1">Email</label>
      <input
        type="email"
        id="form2Example1"
        class="form-control"
        v-model="data.email"
        required
      />
    </div>
    <div class="form-outline mb-4">
      <label class="form-label" for="form2Example2">Mật khẩu</label>
      <input
        type="password"
        id="form2Example2"
        class="form-control"
        v-model="data.pass"
        required
      />
    </div>
    <span
      v-if="error.pass == false"
      class="text-danger"
      style="font-size: 13px"
    >
      <i class="fa-solid fa-triangle-exclamation"></i> Email hoặc mật khẩu không
      đúng!
    </span>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary">Đăng nhập</button>
    </div>
    <div class="d-flex justify-content-center mt-2">
      <button type="button" class="btn btn-danger" @click="dangky">Đăng ký</button>
    </div>
    <span
      v-if="error.loginfail == true"
      class="text-danger"
      style="font-size: 13px"
    >
      <i class="fa-solid fa-triangle-exclamation"></i> Email hoặc mật khẩu không
      đúng!
    </span>
  </form>
</template>
<script>
import login from "../../services/khachhang.service";
export default {
  data() {
    return {
      data: {},
      error: {},
    };
  },
  methods: {
    dangky(){
      this.$router.push({name: 'dangky'})
    },
    async submit() {
      if (this.data.pass.lenght < 6) {
        this.error.pass = false;
      } else {
        this.error.pass = true;
      }
      if (this.error.pass == true) {
        try {
          this.error.loginfail = false;
          await login.login(this.data.email, this.data.pass).then((result) => {
            if (result) {
              const user = result[0];
              localStorage.setItem("User", user["email"]),
                localStorage.setItem("iduser", user["_id"]),
                (window.location.href = "/");
            }
          });
        } catch (error) {
          console.log(error);
          this.error.loginfail = true;
        }
      }
    },
  },
};
</script>
