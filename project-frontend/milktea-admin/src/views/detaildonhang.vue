<template>
  <div class="row justify-content-center">
    <div class="border border-light rounded bg-warning row my-5 w-50 p-3">
      <div>
        <h5 class="fw-bold fs-4 text-center">Chi tiết đơn hàng</h5>
        <div class="my-2">Tên sản phẩm: {{ order.tensp }}</div>
        <div class="my-2">Số lượng: {{ order.soluong }}</div>
        <div class="my-2">Size: {{ order.size }}</div>
        <div class="my-2">Tổng: {{ currency(order.soluong * order.gia) }}</div>
        <div class="my-2">Tên khách hàng: {{ khachhang.name }}</div>
        <div class="my-2">Số điện thoại: {{ khachhang.sdt  }}</div>
        <div class="my-2">Địa chỉ: {{ khachhang.diachi  }}</div>
        <div class="my-2">Trạng thái: {{ order.trangthai }}</div>
        <div>
          <button v-if="order.trangthai == 'Đã xác nhận'" disabled class="btn btn-primary">Xác nhận</button>
          <button v-else class="btn btn-primary" @click="xacnhan">Xác nhận</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import khachhang from "../services/khachhang.service";
import order from "../services/donhang.service";
import sanpham from "../services/sanpham.service";
export default {
  props: {
    id: { type: String, require: true },
  },
  data() {
    return {
      khachhang: {},
      order: {},
      idkh: localStorage.getItem("login"),
    };
  },
  methods: {
    async xacnhan(){
        this.order.trangthai = "Đã xác nhận"
        await order.update(this.order._id, this.order).then(
            alert("Đã xác nhận đơn hàng"),
            window.location.href = "/donhang",
        )
    },
    currency(money) {
      return parseInt(money).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
  async created() {
    try {
      await order.detaildonhang(this.id).then((result) => {
        this.order = result;
      });
      await sanpham.detailsanpham(this.order.masp).then((kq) => {
        this.order.tensp = kq.name;
        this.order.gia = kq.gia;
      });
      await khachhang.detailkhachhang(this.order.makh).then((result) => {
        this.khachhang = result;
      });
      console.log(this.order);
      console.log(this.khachhang);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
