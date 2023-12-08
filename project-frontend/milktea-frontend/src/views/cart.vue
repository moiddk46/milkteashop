<template>
  <h5 class="text-center fw-bold fs-3">Giỏ hàng</h5>
  <div class="row my-2 border border-light bg-light rounded p-3">
    Thông tin nhận hàng:
    <div class="d-flex my-2">
      <div class="me-5">
        Tên:
        {{ khachhang.name }}
      </div>
      <div class="">Số điện thoại: +{{ khachhang.sdt }}</div>
    </div>
    <div>Địa chỉ: {{ khachhang.diachi }}</div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary w-25" @click="editgiaohang">
        <i class="fa-solid fa-pen-to-square me-2"></i>Chỉnh sửa
      </button>
    </div>
  </div>
  <div class="row mb-3" v-for="(c, index) in cart" :key="index">
    <div class="col-3">
      <img :src="c.hinhanh" alt="" class="img-cart rounded" />
    </div>
    <div class="row col-9">
      <div>{{ c.tensp }}</div>
      <div class="row">
        <div class="col-3">SL: x{{ c.soluong }}</div>
        <div class="col-3">Size: {{ c.size }}</div>
        <div class="col-3">
          Tổng:
          {{ currency(c.soluong * c.gia) }}
        </div>
        <div class="col-3">
          <button class="btn btn-danger" @click="deletecart(c._id)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="row my-4">
    <div class="col-9">Tổng: {{ currency(tong()) }}</div>
    <div class="col-3">
      <button class="btn btn-warning" @click="dathang">Đặt hàng</button>
    </div>
  </div>
</template>
<script>
import listcart from "../services/cart.service";
import khachhang from "../services/khachhang.service";
import sanpham from "../services/home.service";
import order from "../services/dathang.service";
export default {
  data() {
    return {
      cart: {},
      idkh: localStorage.getItem("iduser"),
      khachhang: {},
      order: {},
    };
  },
  methods: {
    editgiaohang(){
      this.$router.push({name: 'chinhsuathongtin'})
    },
    tong() {
      var count = 0;
      for (var i in this.cart) {
        count = count + this.cart[i].soluong * this.cart[i].gia;
      }
      return count;
    },
    currency(money) {
      return parseInt(money).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
    async deletecart(id) {
      if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏi hàng?")) {
        try {
          await listcart.timcart(id).then(async (result) => {
            console.log(result);
            await listcart
              .rollback(result)
              .then(
                await listcart
                  .delete(id)
                  .then((window.location.href = "/giohang"))
              );
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async dathang() {
      var d = new Date();
      var ngaydh = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
      var ngaygh = d.getDate() + 1 + "-" + d.getMonth() + "-" + d.getFullYear();
      this.order = this.cart;
      for (var i in this.order) {
        this.order[i].ngaydh = ngaydh;
        this.order[i].ngaygh = ngaygh;
        this.order[i].trangthai = "Chờ Xác nhận";
        await order
          .add(this.order[i])
          .then(
            await listcart
              .delete(this.order[i]._id)
              .then(
                alert("Đã đặt hàng vui lòng chờ xác nhận."),
                (window.location.href = "/giohang")
              )
          );
      }
    },
  },
  async created() {
    try {
      await listcart.listcart(this.idkh).then(async (result) => {
        this.cart = result;

        for (var i in this.cart) {
          await sanpham.detailsanpham(this.cart[i].masp).then((kq) => {
            this.cart[i].tensp = kq.name;
            this.cart[i].gia = kq.gia;
            this.cart[i].hinhanh = kq.hinhanh;
          });
        }
      });
      await khachhang.detailkhachhang(this.idkh).then((result) => {
        this.khachhang = result;
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style>
.img-cart {
  width: 80px;
  height: 50px;
}
</style>
