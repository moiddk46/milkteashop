const SanphamService = require("../services/sanpham.service");
const MongoDB = require("../utils/monggodb.utils");
const ApiError = require("../api-error");
exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const sanphamService = new SanphamService(MongoDB.client);
    const document = await sanphamService.create(req.body);
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while create san pham"));
  }
};

exports.findAll = async (req, res, next) => {
  let document = [];

  try {
    const sanphamService = new SanphamService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      document = await sanphamService.findByname(name);
    } else {
      document = await sanphamService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving san pham")
    );
  }
  return res.send(document);
};
exports.findbyid = async (req, res, next) => {
  try {
    const sanphamService = new SanphamService(MongoDB.client);
    const document = await sanphamService.findByid(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retreving khachhang with id=${req.params.id}`)
    );
  }
};
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not empty"));
  }
  try {
    const sanphamService = new SanphamService(MongoDB.client);
    const document = await sanphamService.update(req.params.id, req.body);
    if (document) {
      return next(new ApiError(404, "san pham not found"));
    }
    return res.send({ message: "Khachhang was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating san pham with id= ${req.params.id}`)
    );
  }
};
exports.updatesoluong = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not empty"));
  }
  try {
    const sanphamService = new SanphamService(MongoDB.client);
    const find = await sanphamService.findByid(req.body.masp);
    if (find) {
      req.body.soluong = find.soluong - req.body.soluong;
      const document = await sanphamService.update(req.body.masp, req.body);
      if (document) {
        return next(new ApiError(404, "san pham not found"));
      }
      return res.send({ message: "soluong was updated successfully" });
    }
  } catch (error) {
    return next(
      new ApiError(500, `Error updating san pham with id= ${req.params.id}`)
    );
  }
};
exports.rollbacksoluong = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not empty"));
  }
  try {
    const sanphamService = new SanphamService(MongoDB.client);
    const find = await sanphamService.findByid(req.body.masp);
    if (find) {
      req.body.soluong = find.soluong + req.body.soluong;
      const document = await sanphamService.update(req.body.masp, req.body);
      if (document) {
        return next(new ApiError(404, "san pham not found"));
      }
      return res.send({ message: "soluong was updated successfully" });
    }
  } catch (error) {
    return next(
      new ApiError(500, `Error updating san pham with id= ${req.params.id}`)
    );
  }
};
exports.delete = async (req, res, next) => {
  try {
    const sanphamService = new SanphamService(MongoDB.client);
    const document = await sanphamService.delete(req.params.id);
    if (document) {
      return next(new ApiError(404, "San pham not found"));
    }
    return res.send({ message: "San pham was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete San pham with id= ${req.params.id}`)
    );
  }
};
