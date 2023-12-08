const { ObjectId } = require("mongodb");

class giohangService {
  constructor(client) {
    this.Giohang = client.db().collection("giohang");
  }

  extractConactData(payload) {
    const giohang = {
      masp: payload.masp,
      makh: payload.makh,
      soluong: payload.soluong,
      size: payload.size
    };

    Object.keys(giohang).forEach(
      (key) => giohang[key] === undefined && delete giohang[key]
    );
    return giohang;
  }
  async create(payload) {
    const giohang = this.extractConactData(payload);
    const result = await this.Giohang.findOneAndUpdate(
      giohang,
      {$set: {}},
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cusor = await this.Giohang.find(filter);
    return await cusor.toArray();
  }
  async findByid(id){
    return await this.Giohang.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async findBysp(id,size){
    return await this.Giohang.findOne({
      masp: id,
      size: size,
    });
  }
  async findByidkh(makh) {
    return await this.find({
      makh: makh,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractConactData(payload);
    const result = await this.Giohang.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  };
  async updatetheoma(id,size, payload) {
    const filter = {
      masp: id,
      size: size
    };

    const update = this.extractConactData(payload);
    const result = await this.Giohang.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  };
  async delete(id) {
    const result = await this.Giohang.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
}
module.exports = giohangService;