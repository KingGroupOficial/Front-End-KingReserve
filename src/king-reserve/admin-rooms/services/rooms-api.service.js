import axios from "axios";

const url_FakeApi = "https://66f71709b5d85f31a341fe55.mockapi.io";

const url = axios.create({
    baseURL: url_FakeApi, // Corrected property name to baseURL
});

export class RoomsApiService {

    getAll() {
        return url.get('/rooms');
    }

    getRoomById(id) {
        return url.get(`/rooms/${id}`);
    }

    create(room) {
        return url.post('/rooms', room);
    }

    update(id, room) {
        return url.put(`/rooms/${id}`, room);
    }

    delete(id) {
        return url.delete(`/rooms/${id}`);
    }

    findByName(name) {
        return url.get(`/rooms?name=${name}`);
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