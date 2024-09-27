import http from "@/shared/services/http-common.js";

export class RoomsApiService{

    getAll(){
        return http.get('/rooms');
    }

    getRoomById(id){
        return http.get(`/rooms/${id}`);
    }

    create(room){
        return http.post('/rooms',room);
    }

    update(id, room){
        return http.put(`/rooms/${id}`,room);
    }

    delete(id){
        return http.delete(`/rooms/${id}`);
    }

    findByName(name){
        return http.get(`/rooms?name=${name}`);
    }

    async getTotalRooms() {
        try {
            const response = await this.getAll();
            return response.data.length;
        } catch (error) {
            console.error('Error fetching total rooms:', error);
            throw error;
        }
    }
}