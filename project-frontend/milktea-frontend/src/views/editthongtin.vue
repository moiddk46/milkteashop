<template>
  <div class="m-5 mt-5 border border-light rounded bg-light">
    <h2 class="font-weight-bold text-center text-primary my-2">
      Chỉnh thông tin cá nhân
    </h2>
    <div class="d-flex justify-content-center">
      <form @submit.prevent="edit" class="w-50">
        <div class="mb-3">
          <label for="hoten" class="form-label">Họ tên</label>
          <input
            type="text"
            class="form-control"
            id="hoten"
            v-model="khachhang.name"
            required
          />
        </div>
        <span
          v-if="error.name == false"
          class="text-danger"
          style="font-size: 13px"
        >
          <i class="fa-solid fa-triangle-exclamation"></i> Tên quá ngắn!
        </span>
        <div class="mb-3">
          <label for="diachi" class="form-label">Địa chỉ</label>
          <input
            type="text"
            class="form-control"
            id="diachi"
            v-model="khachhang.diachi"
            required
          />
        </div>
        <span
          v-if="error.diachi == false"
          class="text-danger"
          style="font-size: 13px"
        >
          <i class="fa-solid fa-triangle-exclamation"></i> Địa chỉ quá ngắn!
        </span>
        <div class="mb-3">
          <label for="sdt" class="form-label"> Số điện thoại</label>
          <input
            type="text"
            class="form-control"
            id="sdt"
            v-model="khachhang.sdt"
            required
          />
        </div>
        <span
          v-if="error.sdt == false"
          class="text-danger"
          style="font-size: 13px"
        >
          <i class="fa-solid fa-triangle-exclamation"></i> Số điện thoại phải là
          10 số!
        </span>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="khachhang.email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Mật khẩu</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            v-model="khachhang.pass"
            required
          />
        </div>
        <span
          v-if="error.pass == false"
          class="text-danger"
          style="font-size: 13px"
        >
          <i class="fa-solid fa-triangle-exclamation"></i> Mật khẩu phải có tối
          thiểu 6 ký tự!
        </span>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary mb-3 me-3">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import detailkh from "../services/khachhang.service";
export default {
  data() {
    return {
      khachhang: {},
      error: {},
      idkh: localStorage.getItem("iduser"),
    };
  },
  methods: {
    async edit() {
      if (this.khachhang.name.length >= 6) {
        this.error.name = true;
      } else {
        this.error.name = false;
      }
      if (this.khachhang.diachi.length >= 6) {
        this.error.diachi = true;
      } else {
        this.error.diachi = false;
      }
      if (this.khachhang.sdt.length != 10) {
        this.error.sdt = false;
      } else {
        this.error.sdt = true;
      }
      if (this.khachhang.pass.length >= 6) {
        this.error.pass = true;
      } else {
        this.error.pass = false;
      }
      if (
        this.error.name == true &&
        this.error.diachi == true &&
        this.error.sdt == true &&
        this.error.pass == true
      ) {
        try {
          await detailkh
            .update(this.khachhang._id, this.khachhang)
            .then(
              alert("cap nhat thanh cong"),
              this.$router.push({ name: "home" })
            );
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  async created() {
    await detailkh.detailkhachhang(this.idkh).then((result) => {
      this.khachhang = result;
      console.log(this.khachhang);
    });
  },
};
</script>
