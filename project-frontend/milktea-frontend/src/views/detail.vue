<template>
  <div class="row">
    <div class="col-4">
      <img
        class="img-chitiet border rounded"
        :src="sanpham.hinhanh"
        alt="khong co anh"
      />
    </div>
    <div class="col-8">
      <h5 class="text-center fw-bold fs-4">{{ sanpham.name }}</h5>
      <div class="my-4">{{ sanpham.mota }}</div>
      <div class="d-flex justify-content-end mb-4">
        <div class="text-danger me-3">
          Giá:
          {{
            parseInt(sanpham.gia).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          }}
        </div>
        <div>SL: {{ sanpham.soluong }}</div>
      </div>
      <div class="d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Thêm vào giỏ hàng
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <form @submit.prevent="addcart">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    {{ sanpham.name }}
                  </h1>
                  <button
                    type="button"
                    class="btn-close offset-12"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div>Chọn size</div>
                    <div class="row mx-3">
                      <div class="form-check col-4">
                        <input
                          class="form-check-input border border-dark"
                          type="radio"
                          name="size"
                          value="S"
                          id="S"
                          required
                          v-model="cart.size"
                        />
                        <label class="form-check-label" for="S"> S </label>
                      </div>
                      <div class="form-check col-4">
                        <input
                          class="form-check-input border border-dark"
                          type="radio"
                          name="size"
                          id="M"
                          value="M"
                          required
                          v-model="cart.size"
                        />
                        <label class="form-check-label" for="M"> M </label>
                      </div>
                      <div class="form-check col-4">
                        <input
                          class="form-check-input border border-dark"
                          type="radio"
                          name="size"
                          id="L"
                          value="L"
                          required
                          v-model="cart.size"
                        />
                        <label class="form-check-label" for="L">L</label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-6">
                      <label for="soluong">Số lượng</label>
                      <input
                        type="number"
                        min="1"
                        :max="sanpham.soluong"
                        class="form-control border border-dark"
                        required
                        v-model="cart.soluong"
                      />
                    </div>
                    <div class="col-12">SL: {{ sanpham.soluong }}</div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    @click="click"
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Đóng
                  </button>
                  <button type="submit" class="btn btn-primary" @click="check">
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sanpham from "../services/home.service";
import cart from "../services/cart.service";
export default {
  props: {
    idsp: { type: String, require: true },
  },
  data() {
    return {
      sanpham: [],
      idkh: localStorage.getItem("iduser"),
      cart: {
        masp: "",
        makh: "",
        soluong: "",
        size: "",
      },
    };
  },
  methods: {
    check() {
      if (!localStorage.getItem("User")) {
        if (confirm("Bạn phải đăng nhập để thêm giỏ hàng.")) {
          this.$router.push({ name: "login" }),
            (window.location.href = "/login");
        }
      }
    },
    async addcart() {
      try {
        this.cart.masp = this.sanpham._id;
        this.cart.makh = this.idkh;
        await cart
          .add(this.cart)
          .then(
            await cart
              .updatesoluong(this.cart)
              .then(
                alert("Thêm giỏ hàng thành công."),
                this.$router.push({ name: "home" }),
                (window.location.href = "/")
              )
          );
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    try {
      await sanpham.detailsanpham(this.idsp).then((result) => {
        this.sanpham = result;
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style>
.img-chitiet {
  width: 375px;
  max-height: 250px;
}
</style>
