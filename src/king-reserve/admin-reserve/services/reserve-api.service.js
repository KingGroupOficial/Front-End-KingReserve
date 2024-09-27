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



        async getTotalReserves() {
            try {
                const response = await this.getAll();
                return response.data.length;
            } catch (error) {
                console.error('Error fetching total vaccines:', error);
                throw error;
            }
        }

    async getReservesCountByCondition() {
        try {
            const response = await this.getAll();
            const reserves = response.data;

            const conditionCounts = { Finished: 0, Active: 0 };

            reserves.forEach((reserve) => {
                if (reserve.condition === 'Finished') {
                    conditionCounts.Finished++;
                } else if (reserve.condition === 'Active') {
                    conditionCounts.Active++;
                }
            });

            return conditionCounts;
        } catch (error) {
            console.error('Error counting reserves by condition:', error);
            throw error;
        }
    }
}
