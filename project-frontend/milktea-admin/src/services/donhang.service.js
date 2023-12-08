import createApiClient from "./app.service";

class donhangservice {
  constructor(baseUrl = "/api/milktea") {
    this.api = createApiClient(baseUrl);
  }
  async listorder() {
    return (await this.api.get(`/dathang`)).data;
  }
  async listordertheokh(idkh) {
    return (await this.api.get(`/dathang/${idkh}`)).data;
  }
  async detaildonhang(id) {
    return (await this.api.get(`/chitietdathang/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/chitietdathang/${id}`, data)).data;
  }
}
export default new donhangservice();
