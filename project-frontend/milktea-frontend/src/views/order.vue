<template>
  <h5 class="text-center fw-bold fs-3">Đơn hàng</h5>
  <div class="row my-2 border border-light bg-light rounded p-3">
    Thông tin nhận hàng:
    <div class="d-flex my-2">
      <div class="me-5">Tên: {{ khachhang.name }}</div>
      <div class="">Số điện thoại: +{{ khachhang.sdt }}</div>
    </div>
    <div>Địa chỉ:{{ khachhang.diachi }}</div>
  </div>
  <div class="row mb-3" v-for="(o, index) in order" :key="index">
    <div class="col-3">
      <img :src="o.hinhanh" alt="" class="img-cart rounded" />
    </div>
    <div class="row col-9">
      <div class="fs-5 mb-2">{{ o.tensp }}</div>
      <div class="row">
        <div class="col-3">SL: x{{ o.soluong }}</div>
        <div class="col-3">Size: {{ o.size }}</div>
        <div class="col-3 fw-bold">Tổng: {{ currency(o.gia * o.soluong) }}</div>
        <div  v-if="o.trangthai == 'Chờ Xác nhận'" class="col-3 fw-bold text-danger">{{ o.trangthai }}</div>
        <div  v-if="o.trangthai == 'Đã xác nhận'" class="col-3 fw-bold text-success">{{ o.trangthai }}</div>
      </div>
      <div class="row">
        <div class="col-6">Ngày đặt hàng: {{ o.ngaydh }}</div>
        <div class="col-6">Ngày nhận hàng dự kiến: {{ o.ngaygh }}</div>
      </div>
    </div>
  </div>
</template>
<script>
//   import listcart from "../services/cart.service";
import khachhang from "../services/khachhang.service";
import sanpham from "../services/home.service";
import order from "../services/dathang.service";
export default {
  data() {
    return {
      order: {},
      idkh: localStorage.getItem("iduser"),
      khachhang: {},
    };
  },
  methods: {
    currency(money) {
      return parseInt(money).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
  async created() {
    try {
      await order.listorder(this.idkh).then(async (result) => {
        this.order = result;

        for (var i in this.order) {
          await sanpham.detailsanpham(this.order[i].masp).then((kq) => {
            this.order[i].tensp = kq.name;
            this.order[i].gia = kq.gia;
            this.order[i].hinhanh = kq.hinhanh;
          });
        }
      });
      await khachhang.detailkhachhang(this.idkh).then((result) => {
        this.khachhang = result;
        console.log(this.khachhang);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
//   export default {
//     data() {
//       return {
//         cart: {},
//         idkh: localStorage.getItem("iduser"),
//         khachhang: {},
//         order: {},
//       };
//     },
//     methods: {
//       tong() {
//         var count = 0;
//         for (var i in this.cart) {
//           // count +=(this.cart[i].soluong * this.cart[i].gia);
//           count = count + this.cart[i].soluong * this.cart[i].gia;
//         }
//         return count;
//       },
//       currency(money) {
//         return parseInt(money).toLocaleString("vi-VN", {
//           style: "currency",
//           currency: "VND",
//         });
//       },
//       async deletecart(id) {
//         if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏi hàng?")) {
//           try {
//             await listcart.timcart(id).then(async (result) => {
//               console.log(result);
//               await listcart
//                 .rollback(result)
//                 .then(
//                   await listcart
//                     .delete(id)
//                     .then((window.location.href = "/giohang"))
//                 );
//             });
//           } catch (error) {
//             console.log(error);
//           }
//         }
//       },
//       async dathang() {
//         var d = new Date();
//         var ngaydh = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
//         var ngaygh = d.getDate() + 1 + "-" + d.getMonth() + "-" + d.getFullYear();
//         this.order = this.cart;
//         for (var i in this.order) {
//           this.order[i].ngaydh = ngaydh;
//           this.order[i].ngaygh = ngaygh;
//           this.order[i].trangthai = "Chờ Xác nhận";
//           await order
//             .add(this.order[i])
//             .then(
//               await listcart
//                 .delete(this.order[i]._id)
//                 .then(
//                   alert("Đã đặt hàng vui lòng chờ xác nhận."),
//                   (window.location.href = "/giohang")
//                 )
//             );
//         }
//       },
//     },
//     async created() {
//       try {
//         await listcart.listcart(this.idkh).then(async (result) => {
//           this.cart = result;

//           for (var i in this.cart) {
//             await sanpham.detailsanpham(this.cart[i].masp).then((kq) => {
//               this.cart[i].tensp = kq.name;
//               this.cart[i].gia = kq.gia;
//               this.cart[i].hinhanh = kq.hinhanh;
//             });
//           }
//         });
//         await khachhang.detailkhachhang(this.idkh).then((result) => {
//           this.khachhang = result;
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   };
</script>
<style>
.img-cart {
  width: 80px;
  height: 50px;
}
</style>
