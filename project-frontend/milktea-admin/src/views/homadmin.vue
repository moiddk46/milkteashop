<template>
  <div class="m-5 mt-5">
    <h2 class="font-weight-bold text-center text-primary mb-5">
      Khách hàng
    </h2>
    <!-- <button @click="addkhachhang" class="btn btn-primary mb-3"><i class="fa-solid fa-plus me-2"></i>Thêm khách hàng</button> -->
    <router-link :to="{name: 'addconsummer'}" class="btn btn-primary mb-3"> <i class="fa-solid fa-plus me-2"></i>Thêm khách hàng </router-link>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="(kh, index) in khachhang" :key="index">
        <tr>
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ kh.name }}</td>
          <td>{{ kh.diachi }}</td>
          <td>{{ kh.sdt }}</td>
          <td>
            <router-link
              :to="{ name: 'detailconsummer', params: { idkh: kh._id } }"
              ><i class="fa-solid fa-pen-to-square"></i
            ></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

import listkhachhang from "../services/khachhang.service";
export default {
    data() {
        return {
            khachhang: [],
        };
    },
    methods: {
    },
    async created() {
        try {
            await listkhachhang.listkhachhang().then((result) => {
                this.khachhang = result;
            });
        }
        catch (error) {
            console.log(error);
        }
    },
};
</script>
