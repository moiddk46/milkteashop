const { ObjectId } = require("mongodb");

class nhanvienService {
  constructor(client) {
    this.Nhanvien = client.db().collection("Nhanvien");
  }

  extractConactData(payload) {
    const nhanvien = {
      name: payload.name,
      email: payload.email,
      diachi: payload.diachi,
      sdt: payload.sdt,
      pass: payload.pass,
      chucvu: payload.chucvu
    };

    Object.keys(nhanvien).forEach(
      (key) => nhanvien[key] === undefined && delete nhanvien[key]
    );
    return nhanvien;
  }
  async create(payload) {
    const nhanvien = this.extractConactData(payload);
    const result = await this.Nhanvien.findOneAndUpdate(
      nhanvien,
      {$set: {}},
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cusor = await this.Nhanvien.find(filter);
    return await cusor.toArray();
  }
  async findByname(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $option: "i" },
    });
  }
  async findBylogin(email, pass) {
    return await this.find({
      email: email,
      pass: pass,
    });
  }
}
module.exports = nhanvienService;
