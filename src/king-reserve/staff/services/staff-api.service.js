import http from "../../../shared/services/http-common.js";
export class StaffApiService{
    
    getAll() {
        return http.get('/staff')
    }
    getById(id){
        return http.get(`/staff/${id}`);
    }

    create(staffResource){
        return http.post('/staff',staffResource);
    }


    update(id, staff){
        return http.put(`/staff/${id}`,staff);
    }


    delete(id){
        return http.delete(`/staff/${id}`);
    }

    findByName(name){
        return http.get(`/staff?name=${name}`);
    }
}