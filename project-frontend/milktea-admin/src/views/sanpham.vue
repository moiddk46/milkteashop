<template>
  <div class="m-5 mt-5">
    <h2 class="font-weight-bold text-center text-primary mb-5">Sản phẩm</h2>
    <!-- <button @click="addkhachhang" class="btn btn-primary mb-3"><i class="fa-solid fa-plus me-2"></i>Thêm khách hàng</button> -->
    <!-- <router-link :to="{name: 'addconsummer'}" class="btn btn-primary mb-3"> <i class="fa-solid fa-plus me-2"></i>Thêm khách hàng </router-link> -->
    <router-link :to="{name: 'addsanpham'}" class="btn btn-primary mb-3"> <i class="fa-solid fa-plus me-2"></i>Thêm sản phẩm</router-link>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Giá</th>
          <th scope="col">Số lượng kho</th>
          <th scope="col">Ghi chú</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="(sp, index) in sanpham" :key="index">
        <tr>
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ sp.name }}</td>
          <td>{{ sp.mota }}</td>
          <td>
            {{
              parseInt(sp.gia ).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            }}
          </td>
          <td>{{ sp.soluong }}</td>
          <td>{{ sp.ghichu }}</td>
          <td>
            <router-link
              :to="{ name: 'detailsanpham', params: { idsp: sp._id } }"
              ><i class="fa-solid fa-pen-to-square"></i
            ></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import listsanpham from "../services/sanpham.service";
export default {
  data() {
    return {
      sanpham: [],
    };
  },
  methods: {},
  async created() {
    try {
      await listsanpham.listsanpham().then((result) => {
        this.sanpham = result;
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
