const { ObjectId } = require("mongodb");

class khachhangService {
  constructor(client) {
    this.Khachhang = client.db().collection("khachhang");
  }

  extractConactData(payload) {
    const khachhang = {
      name: payload.name,
      email: payload.email,
      diachi: payload.diachi,
      sdt: payload.sdt,
      pass: payload.pass,
    };

    Object.keys(khachhang).forEach(
      (key) => khachhang[key] === undefined && delete khachhang[key]
    );
    return khachhang;
  }
  async create(payload) {
    const khachhang = this.extractConactData(payload);
    const result = await this.Khachhang.findOneAndUpdate(
      khachhang,
      {$set: {}},
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cusor = await this.Khachhang.find(filter);
    return await cusor.toArray();
  }
  async findByname(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $option: "i" },
    });
  }
  async findByid(id){
    return await this.Khachhang.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async findBylogin(email, pass) {
    return await this.find({
      email: email,
      pass: pass,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractConactData(payload);
    const result = await this.Khachhang.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  };
  async delete(id) {
    const result = await this.Khachhang.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
}
module.exports = khachhangService;
