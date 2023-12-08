import createApiClient from "./app.service";

class Sanphamservice{
    constructor (baseUrl = "/api/milktea"){
        this.api = createApiClient(baseUrl);
    }
    async listsanpham(){
        return (await this.api.get("/sanpham")).data;
    }
    async detailsanpham(id){
        return (await this.api.get(`/sanpham/${id}`)).data;
    }
    async update(id, data){
        return(await this.api.put(`/sanpham/${id}`, data)).data;
    }
    async add(data){
        return (await this.api.post(`/sanpham`, data)).data;
    }
    async delete(id){
        return( await this.api.delete(`/sanpham/${id}`)).data;
    }
}
export default new Sanphamservice();