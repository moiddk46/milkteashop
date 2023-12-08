<template>
  <div class="m-5 mt-5 border border-light rounded bg-light">
    <h2 class="font-weight-bold text-center text-primary my-5">
      Hiệu chỉnh thông tin sản phẩm
    </h2>
    <div class="d-flex justify-content-center">
      <form @submit.prevent="editsanpham" class="w-50">
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
          <div class="row">
            <div class="col-md-3">
              <img
                :src="sanpham.hinhanh"
                alt="khong co anh"
                class="imgsanpham"
              />
            </div>
            <div class="col-md-9">
              <textarea
                class="form-control"
                id="hinhanh"
                rows="3"
                v-model="sanpham.hinhanh"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary mb-3 me-3">
            Cập nhật
          </button>
          <button
            type="button"
            @click="deletesanpham"
            class="btn btn-danger mb-3"
          >
            Xóa
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import detailsanpham from "../services/sanpham.service";
export default {
  props: {
    idsp: { type: String, require: true },
  },
  data() {
    return {
      sanpham: {},
      error: {},
    };
  },
  methods: {
    async editsanpham() {
      try {
        await detailsanpham
          .update(this.sanpham._id, this.sanpham)
          .then(
            alert("Cập nhật thành công."),
            this.$router.push({ name: "sanpham" })
          );
      } catch (error) {
        console.log(error);
      }
    },
    async deletesanpham() {
      if (confirm("Bạn muốn xóa sản phẩm này?")) {
        //   try {
        //     await detailkh
        //       .delete(this.khachhang._id)
        //       .then(this.$router.push({ name: "home" }));
        //   } catch (error) {
        //     console.log(error);
        //   }
      }
    },
  },
  async created() {
    await detailsanpham.detailsanpham(this.idsp).then((result) => {
      this.sanpham = result;
    });
  },
};
</script>
<style>
.imgsanpham {
  width: 110px;
  height: 100px;
}
</style>
