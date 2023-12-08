import createApiClient from "./api.service";

class cartservice {
  constructor(baseUrl = "/api/milktea") {
    this.api = createApiClient(baseUrl);
  }
  async listcart(idkh) {
    return (await this.api.get(`/giohang/${idkh}`)).data;
  }
  async timcart(id) {
    return (await this.api.get(`/timgiohang/${id}`)).data;
  }
  async add(data) {
    return (await this.api.post("/giohang", data)).data;
  }
  async updatesoluong(data) {
    return (await this.api.put("/giohang", data)).data;
  }
  async delete(idcart) {
    return (await this.api.delete(`/deletegiohang/${idcart}`)).data;
  }
  async rollback(data) {
    return (await this.api.put("/rollback", data)).data;
  }
}
export default new cartservice();
