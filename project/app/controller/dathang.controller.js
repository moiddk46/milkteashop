const DathangService = require("../services/dathang.service");
const MongoDB = require("../utils/monggodb.utils");
const ApiError = require("../api-error");
exports.create = async (req, res, next) => {
  if (!req.body?.masp) {
    return next(new ApiError(400, "masp can not be empty"));
  }
  try {
    const dathangService = new DathangService(MongoDB.client);
    const document = await dathangService.create(req.body);
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while create dat hang"));
  }
};

exports.findAll = async (req, res, next) => {
  let document = [];

  try {
    const dathangService = new DathangService(MongoDB.client);
    const { masp } = req.query;
    if (masp) {
      document = await dathangService.findByname(masp);
    } else {
      document = await dathangService.find({});
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
    const dathangService = new DathangService(MongoDB.client);
    const document = await dathangService.findByid(req.params.id);
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
    const dathangService = new DathangService(MongoDB.client);
    const document = await dathangService.findByidkh(req.params.id);
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
    const dathangService = new DathangService(MongoDB.client);
    const document = await dathangService.update(req.params.id, req.body);
    if (document) {
      return next(new ApiError(404, "dat hang not found"));
    }
    return res.send({ message: "Khachhang was updated successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating dat hang with id= ${req.params.id}`)
    );
  }
};
