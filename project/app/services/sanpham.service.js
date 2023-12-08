const { ObjectId } = require("mongodb");

class sanphamService {
  constructor(client) {
    this.Sanpham = client.db().collection("sanpham");
  }

  extractConactData(payload) {
    const sanpham = {
      name: payload.name,
      mota: payload.mota,
      gia: payload.gia,
      soluong: payload.soluong,
      ghichu: payload.ghichu,
      hinhanh: payload.hinhanh,
    };

    Object.keys(sanpham).forEach(
      (key) => sanpham[key] === undefined && delete sanpham[key]
    );
    return sanpham;
  }
  async create(payload) {
    const sanpham = this.extractConactData(payload);
    const result = await this.Sanpham.findOneAndUpdate(
      sanpham,
      {$set: {}},
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cusor = await this.Sanpham.find(filter);
    return await cusor.toArray();
  }
  async findByid(id){
    return await this.Sanpham.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async findByname(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $option: "i" },
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractConactData(payload);
    const result = await this.Sanpham.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  };
  async delete(id) {
    const result = await this.Sanpham.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
}
module.exports = sanphamService;