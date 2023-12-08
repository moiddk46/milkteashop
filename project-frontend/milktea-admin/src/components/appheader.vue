<template>
  <nav
    class="navbar navbar-default d-flex flex-column align-items-start"
    id="nav"
  >
    <ul class="navbar-nav row mx-4">
      <a class="navbar-brand text-white my-4 mb-5 fw-bold-text" href=""
        >MILKTEA SHOP</a
      >
      <li class="nav-item">
        <router-link :to="{ name: 'home' }" id="link" class="nav-link"
          >Khách hàng</router-link
        >
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'sanpham' }" id="link" class="nav-link"
          >Sản phẩm</router-link
        >
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'donhang' }" id="link" class="nav-link"
          >Đơn hàng</router-link
        >
      </li>
      <div class="">
        <button class="btn btn-light" v-on:click="logout">Logout</button>
      </div>
    </ul>
  </nav>
</template>
<script>
export default {
  methods: {
    logout() {
      if (confirm("Bạn chắc muốn đăng xuất")) {
        localStorage.removeItem("login");
        window.location.href = "/";
      }
    },
  },
};
</script>
<style>
#nav {
  min-height: 800px;
}
#link {
  text-decoration: none;
  color: white;
}
#link:hover {
  color: black;
}
</style>
