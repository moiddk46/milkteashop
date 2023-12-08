<template>
  <div class="row">
    <router-link
      :to="{ name: 'detailsanpham', params: { idsp: sp._id } }"
      class="card text-center col-md-4 text-decoration-none my-2" style="border: none;"
      v-for="(sp, index) in sanpham"
      :key="index"
    >
      <div class="border border-light rounded bg-light">
        <img :src="sp.hinhanh" class="card-img-top img-sanpham" alt="..." />
        <div class="card-body">
          <p class="card-text fw-bold fs-4">{{ sp.name }}</p>
        </div>
        <div class="row">
          <p class="card-text text-danger col-6">
            {{
              parseInt(sp.gia).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            }}
          </p>
          <p class="text-right col-6" v-if="sp.soluong>0">SL:{{ sp.soluong }}</p>
          <p class="text-right col-6" v-else>Sold</p>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
import listsanpham from "../services/home.service";

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
<style>
.img-sanpham {
  height: 250px;
  width: 280;
}
</style>
