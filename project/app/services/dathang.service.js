const { ObjectId } = require("mongodb");

class dathangService {
  constructor(client) {
    this.Dathang = client.db().collection("dathang");
  }

  extractConactData(payload) {
    const dathang = {
      masp: payload.masp,
      makh: payload.makh,
      soluong: payload.soluong,
      size: payload.size,
      ngaydh: payload.ngaydh,
      ngaygh: payload.ngaygh,
      trangthai: payload.trangthai
    };

    Object.keys(dathang).forEach(
      (key) => dathang[key] === undefined && delete dathang[key]
    );
    return dathang;
  }
  async create(payload) {
    const dathang = this.extractConactData(payload);
    const result = await this.Dathang.findOneAndUpdate(
      dathang,
      {$set: {}},
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cusor = await this.Dathang.find(filter);
    return await cusor.toArray();
  }
  async findByid(id){
    return await this.Dathang.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async findBysp(id,size){
    return await this.Dathang.findOne({
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
    const result = await this.Dathang.findOneAndUpdate(
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
    const result = await this.Dathang.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  };
  async delete(id) {
    const result = await this.Dathang.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
}
module.exports = dathangService;