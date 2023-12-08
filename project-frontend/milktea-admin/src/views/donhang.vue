<template>
  <div class="m-5 mt-5">
    <h2 class="font-weight-bold text-center text-primary mb-5">Đơn hàng</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Mã đơn hàng</th>
          <th scope="col">Ngày đặt hàng</th>
          <th scope="col">Ngày giao hàng</th>
          <th scope="col">Trạng thái</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="(o, index) in order" :key="index">
        <tr>
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ o._id }}</td>
          <td>{{ o.ngaydh }}</td>
          <td>{{ o.ngaygh }}</td>
          <td v-if="o.trangthai =='Đã xác nhận'" class="text-success">{{ o.trangthai }}</td>
          <td v-if="o.trangthai =='Chờ Xác nhận'" class="text-danger">{{ o.trangthai }}</td>
          <td><router-link :to="{name: 'chitietdonhang', params: { id: o._id }}"><i class="fa-solid fa-circle-info"></i></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import order from "../services/donhang.service";
export default {
  data() {
    return {
      khachhang: [],
      order: [],
    };
  },
  methods: {},
  async created() {
    try {
      await order .listorder().then((result)=>{
        this.order = result;
      })
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
