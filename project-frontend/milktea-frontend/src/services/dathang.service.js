import createApiClient from "./api.service";

class dathangservice {
  constructor(baseUrl = "/api/milktea") {
    this.api = createApiClient(baseUrl);
  }
  async listorder(idkh) {
    return (await this.api.get(`/dathang/${idkh}`)).data;
  }
//   async timcart(id) {
//     return (await this.api.get(`/timgiohang/${id}`)).data;
//   }
  async add(data) {
    return (await this.api.post("/dathang", data)).data;
  }
//   async updatesoluong(data) {
//     return (await this.api.put("/giohang", data)).data;
//   }
//   async delete(idcart) {
//     return (await this.api.delete(`/deletegiohang/${idcart}`)).data;
//   }
//   async rollback(data) {
//     return (await this.api.put("/rollback", data)).data;
//   }
}
export default new dathangservice();
