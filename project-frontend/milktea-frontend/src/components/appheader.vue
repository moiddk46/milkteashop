<template>
  <nav class="navbar navbar-expand-lg bg-warning">
    <router-link :to="{ name: 'home' }" class="navbar-brand mx-4"
      >MILKTEA SHOP</router-link
    >
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'home' }" class="nav-link"
            >Trang chủ</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'dathang' }" class="nav-link"
            >Đơn hàng</router-link
          >
        </li>
      </ul>
    </div>
    <div class="row me-3">
      <router-link :to="{name: 'giohang'}" class="col-2 align-self-center me-3"><i class="fa-solid fa-cart-shopping fa-xl"></i></router-link>
      <router-link v-if="email == null" :to="{ name: 'login' }" class="btn btn-primary col-9"
        ><i class="fa-solid fa-right-to-bracket me-2"></i>Đăng nhập
</router-link
      >
      <div class="col-9 d-flex" v-else>
        <button class="btn btn-primary me-2" @click="editthongtin"
          ><i class="fa-solid fa-user me-2"></i></button
        >
        <button class="btn btn-primary me-2" @click="logout"
          ><i class="fa-solid fa-right-from-bracket"></i></button
        >
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      email: localStorage.getItem("User"),
    };
  },
  methods: {
    logout() {
      if(confirm("Bạn chắc muốn đăng xuất?")){
      localStorage.removeItem("User");
      localStorage.removeItem("iduser");
      window.location.href = "/";
      }
    },
    editthongtin(){
      this.$router.push({name: 'chinhsuathongtin'});
    }
  },
};
</script>
