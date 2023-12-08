const NhanvienService = require("../services/nhanvien.service");
const MongoDB = require("../utils/monggodb.utils");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const nhanvienService = new NhanvienService(MongoDB.client);
    const document = await nhanvienService.create(req.body);
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while create nhan vien"));
  }
};

exports.findAll = async (req, res, next) => {
  let document = [];

  try {
    const nhanvienService = new NhanvienService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      document = await nhanvienService.findByname(name);
    } else {
      document = await nhanvienService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving nhan vien")
    );
  }
  return res.send(document);
};
exports.login = async (req, res, next) => {
  const nhanvienService = new NhanvienService(MongoDB.client);
  const data = req.body;
  try {
    if (data) {
      document = await nhanvienService.findBylogin(data.email, data.pass);
      if(document){
        return res.send(document);
      }else{
        return res.send(false);
      }
    }
  } catch (error) {
    return next(
      new ApiError(500, "khong tim thay user")
    );
  }
  
};
