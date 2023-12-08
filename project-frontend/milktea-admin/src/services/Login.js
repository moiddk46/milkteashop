import createApiClient from "./app.service";

class milkteaadmin{
    constructor (baseUrl = "/api/milktea"){
        this.api = createApiClient(baseUrl);
    }
    async login(email, pass){
        return (await this.api.post("/adminlogin",{email,pass})).data;
    }
}
export default new milkteaadmin();