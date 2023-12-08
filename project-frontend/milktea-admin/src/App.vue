<script>
import login from "./views/login.vue";
import appheader from "./components/appheader.vue";

import { RouterView } from "vue-router";
export default {
  components: {
    login,
    appheader,
    RouterView,
  },
  data() {
    return { data: localStorage.getItem("login") };
  },
};
</script>
<template>
  <div class="mx-4" v-if="!data">
    <login />
  </div>
  <div v-else>
    <div class="row w-100">
      <div class="col-md-2 bg-primary">
        <appheader />
      </div>
      <div class="col-md-10 bg-secondary-subtle">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
