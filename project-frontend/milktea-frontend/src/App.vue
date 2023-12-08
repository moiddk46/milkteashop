<script>
import appfooter from '@/components/appfooter.vue';
import appheader from '@/components/appheader.vue';
import { RouterView } from 'vue-router';
export default {
  components:{
    appheader,
    appfooter,
    RouterView
}
};
</script>
<template>
  <div>
    <appheader />
  </div>
  <div class="container my-5">
    <RouterView />
  </div>
  <div>
    <appfooter />
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
