import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "jquery";
// import "jquery";

// $('#addkhachhang').validate({
//     rules: {
//         hoten: required,
//         diachi: required,
//         sdt:{
//             required: true,
//             length: 10
//         },
//         email: {
//           required: true,
//           email: true
//         },
//         pass: {
//           required: true,
//           minlength: 6
//         },
//       },

//       messages: {
//         hoten: "Vui lòng nhập họ tên",
//         diachi: "Vui lòng nhập địa chỉ",
//         sdt:{
//             required: "Vui lòng nhập số điện thoại",
//             length: "Số điện thoại phải là 10 số"
//         },
//         email: "Email không hợp lệ",
//         pass: {
//           required: "Vui lòng nhập mật khẩu",
//           minlength: "Mật khẩu phải có tối thiểu 6 ký tự"
//         },
//       },
// })
import router from "./router";

createApp(App).use(router).mount("#app");
