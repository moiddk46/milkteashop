<template>
  <div class="m-5 mt-5 border border-light rounded bg-light">
    <h2 class="fw-bold text-center text-primary my-5">
      Thêm thông tin sản phẩm
    </h2>
    <div class="d-flex justify-content-center">
      <form @submit.prevent="addsanpham" class="w-50">
        <div class="mb-3">
          <label for="hoten" class="form-label">Tên sản phẩm</label>
          <input
            type="text"
            class="form-control"
            v-model="sanpham.name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="mota" class="form-label">Mô tả sản phẩm</label>
          <textarea
            class="form-control"
            id="mota"
            rows="5"
            v-model="sanpham.mota"
            required
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="gia" class="form-label">Giá sản phẩm</label>
          <input
            type="text"
            class="form-control"
            id="gia"
            v-model="sanpham.gia"
            required
          />
        </div>
        <div class="mb-3">
          <label for="soluong" class="form-label">Số lượng</label>
          <input
            type="number"
            class="form-control"
            id="soluong"
            v-model="sanpham.soluong"
            required
          />
        </div>
        <div class="mb-3">
          <label for="ghichu" class="form-label">Ghi chú</label>
          <textarea
            class="form-control"
            id="ghichu"
            rows="3"
            v-model="sanpham.ghichu"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="hinhanh" class="form-label">Hình ảnh</label>
          <textarea
            class="form-control"
            id="hinhanh"
            rows="3"
            v-model="sanpham.hinhanh"
          ></textarea>
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary mb-3 me-3">Thêm</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import sanpham from "../services/sanpham.service";
export default {
  data() {
    return {
      sanpham: {
        name: "",
        mota: "",
        gia: "",
        soluong: "",
        ghichu: "",
        hinhanh: "",
      },
      error: {},
    };
  },
  methods: {
    async addsanpham() {
      try {
        await sanpham
          .add(this.sanpham)
          .then(
            alert("Thêm sản phẩm thành công."),
            this.$router.push({ name: "sanpham" })
          );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
.imgsanpham {
  width: 110px;
  height: 100px;
}
</style>
