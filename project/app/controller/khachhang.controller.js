const KhachhangService = require("../services/khachhang.service");
const MongoDB = require("../utils/monggodb.utils");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const khachhangService = new KhachhangService(MongoDB.client);
    const document = await khachhangService.create(req.body);
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while create khach hang"));
  }
};

exports.findAll = async (req, res, next) => {
  let document = [];

  try {
    const khachhangService = new KhachhangService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      document = await khachhangService.findByname(name);
    } else {
      document = await khachhangService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving khach hang")
    );
  }
  return res.send(document);
};
exports.findbyid = async (req, res, next) => {
  try {
    const khachhangService = new KhachhangService(MongoDB.client);
    const document = await khachhangService.findByid(req.params.id);
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
exports.login = async (req, res, next) => {
  const khachhangService = new KhachhangService(MongoDB.client);
  const data = req.body;
  try {
    if (data) {
      document = await khachhangService.findBylogin(data.email, data.pass);
      if (document) {
        return res.send(document);
      } else {
        return res.send(false);
      }
    }
  } catch (error) {
    return next(new ApiError(500, "khong tim thay user"));
  }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Data to update can not empty"));
    }
    try {
      const khachhangService = new KhachhangService(MongoDB.client);
      const document = await khachhangService.update(req.params.id, req.body);
      if (document) {
        return next(new ApiError(404, "Khach hang not found"));
      }
      return res.send({ message: "Khachhang was updated successfully" });
    } catch (error) {
      return next(
        new ApiError(500, `Error updating khach hang with id= ${req.params.id}`)
      );
    }
  };
  exports.delete = async (req, res, next) => {
    try {
      const khachhangService = new KhachhangService(MongoDB.client);
      const document = await khachhangService.delete(req.params.id);
      if (document) {
        return next(new ApiError(404, "Contact not found"));
      }
      return res.send({ message: "Khach hang was deleted successfully" });
    } catch (error) {
      return next(
        new ApiError(500, `Could not delete khach hang with id= ${req.params.id}`)
      );
    }
  };
