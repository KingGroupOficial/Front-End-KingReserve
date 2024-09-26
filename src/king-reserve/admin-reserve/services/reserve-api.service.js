import http from "@/shared/services/http-common.js";

export class ReserveApiService{

        getAll(){
            return http.get('/reservations');
        }

        getById(id){
            return http.get(`/reservations/${id}`);
        }

        create(reserve){
            return http.post('/reservations',reserve);
        }

        update(id, reserve){
            return http.put(`/reservations/${id}`,reserve);
        }

        delete(id){
            return http.delete(`/reservations/${id}`);
        }

        findByName(name){
            return http.get(`/reservations?name=${name}`);
        }

        async getTotalReserves() {
            try {
                const response = await this.getAll();
                return response.data.length;
            } catch (error) {
                console.error('Error fetching total vaccines:', error);
                throw error;
            }
        }
}
