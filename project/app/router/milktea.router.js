const express = require("express");
const nhanvien = require("../controller/nhanvien.controller");
const milktea = require("../controller/khachhang.controller");
const sanpham = require("../controller/sanpham.controller");
const giohang = require("../controller/giohang.controller");
const dathang = require("../controller/dathang.controller");
const router = express.Router();
router
  .route("/giohang")
  .get(giohang.findAll)
  .post(giohang.create)
  .put(sanpham.updatesoluong);
router.route("/giohang/:id").get(giohang.findbyidkh);
router.route("/timgiohang/:id").get(giohang.findbyid);
router.route("/deletegiohang/:id").delete(giohang.delete);
router.route("/rollback").put(sanpham.rollbacksoluong);

router.route("/dathang")
  .get(dathang.findAll)
  .post(dathang.create);
router.route("/dathang/:id")
  .get(dathang.findbyidkh);
router.route("/chitietdathang/:id")
  .get(dathang.findbyid)
  .put(dathang.update);
router.route("/sanpham").get(sanpham.findAll).post(sanpham.create);
router
  .route("/sanpham/:id")
  .get(sanpham.findbyid)
  .put(sanpham.update)
  .delete(sanpham.delete);
router.route("/listkhachhang").get(milktea.findAll).post(milktea.create);
router.route("/login").post(milktea.login);
router
  .route("/listkhachhang/:id")
  .get(milktea.findbyid)
  .put(milktea.update)
  .delete(milktea.delete);
router.route("/adminlogin").post(nhanvien.login);

module.exports = router;
