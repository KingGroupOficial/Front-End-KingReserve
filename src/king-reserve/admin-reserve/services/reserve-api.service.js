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

        // Api para conseguir la cantidad de las condiciones de la reserva
    async getReserveConditionCount() {
        try {
            const response = await http.get('/reservations');
            const reservations = response.data;
            return reservations.reduce((acc, reservation) => {
                const condition = reservation.condition;
                if (acc[condition]) {
                    acc[condition]++;
                } else {
                    acc[condition] = 1;
                }
                return acc;
            }, {});
        } catch (error) {
            console.error('Error fetching reservation conditions:', error);
            throw error;
        }
    }
}
