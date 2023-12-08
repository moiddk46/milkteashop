const GiohangService = require("../services/giohang.service");
const SanphamService = require("../services/sanpham.service");
const MongoDB = require("../utils/monggodb.utils");
const ApiError = require("../api-error");
exports.create = async (req, res, next) => {
  if (!req.body?.masp) {
    return next(new ApiError(400, "masp can not be empty"));
  }
  try {
    const giohangService = new GiohangService(MongoDB.client);
    const find = await giohangService.findBysp(req.body.masp, req.body.size);
    if (find) {
      req.body.soluong = find.soluong + req.body.soluong;
      const document = await giohangService.updatetheoma(
        req.body.masp,
        req.body.size,
        req.body
      );
      return res.send(document);
    } else {
      const document = await giohangService.create(req.body);
      return res.send(document);
    }
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while create gio hang"));
  }
};

exports.findAll = async (req, res, next) => {
  let document = [];

  try {
    const giohangService = new GiohangService(MongoDB.client);
    const { masp } = req.query;
    if (masp) {
      document = await giohangService.findByname(masp);
    } else {
      document = await giohangService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving gio hang")
    );
  }
  return res.send(document);
};
exports.findbyid = async (req, res, next) => {
  try {
    const giohangService = new GiohangService(MongoDB.client);
    const document = await giohangService.findByid(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retreving gio hang with id=${req.params.id}`)
    );
  }
};
exports.findbyidkh = async (req, res, next) => {
  try {
    const giohangService = new GiohangService(MongoDB.client);
    const document = await giohangService.findByidkh(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retreving gio hang with id=${req.params.id}`)
    );
  }
};
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not empty"));
  }
  try {
    const giohangService = new GiohangService(MongoDB.client);
    const document = await giohangService.update(req.params.id, req.body);
    if (document) {
      return next(new ApiError(404, "Gio hang not found"));
    }
    return res.send({ message: "Khachhang was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating Gio hang with id= ${req.params.id}`)
    );
  }
};
exports.delete = async (req, res, next) => {
  try {
    const giohangService = new GiohangService(MongoDB.client);
    const document = await giohangService.delete(req.params.id);
    if (document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Gio hang was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete Gio hang with id= ${req.params.id}`)
    );
  }
};
