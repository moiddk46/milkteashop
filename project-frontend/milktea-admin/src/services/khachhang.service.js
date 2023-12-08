import createApiClient from "./app.service";

class khachhangservice{
    constructor (baseUrl = "/api/milktea"){
        this.api = createApiClient(baseUrl);
    }
    async listkhachhang(){
        return (await this.api.get("/listkhachhang")).data;
    }
    async detailkhachhang(idkh){
        return (await this.api.get(`/listkhachhang/${idkh}`)).data;
    }
    async update(idkh, data){
        return(await this.api.put(`/listkhachhang/${idkh}`, data)).data;
    }
    async add(data){
        return (await this.api.post(`/listkhachhang`, data)).data;
    }
    async delete(idkh){
        return( await this.api.delete(`/listkhachhang/${idkh}`)).data;
    }
}
export default new khachhangservice();