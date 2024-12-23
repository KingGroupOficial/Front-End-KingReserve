import axios from "axios";

const url_FakeApi = "https://kingreserve-gqc8ayfabyghb3cw.brazilsouth-01.azurewebsites.net/api/v1";

const url = axios.create({
    baseURL: url_FakeApi,
});

url.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export class RoomsApiService {

    getAll(reserveId) {
        return url.get(`/reserve/${reserveId}/rooms`);
    }

    getById(reserveId, roomId) {
        return url.get(`/reserve/${reserveId}/rooms/${roomId}`);
    }

    async getByIdRoom(id) {
        if (!id) {
            console.error('Error: Room ID is undefined or null.');
            throw new Error('Room ID is required');
        }
        return url.get(`/reserve/${id}/rooms`);
    }

    create(room) {
        return url.post(`/reserve/add-room`, room);
    }

    update(reserveId, roomId, roomData) {
        return axios.put(`/api/v1/reserve/${reserveId}/rooms/${roomId}`, roomData);
    }

    delete(reserveId, roomId) {
        return url.delete(`/reserve/${reserveId}/room`, { data: { roomId } });
    }

    updateRoomStatus(roomId, status) {
        return url.put(`/reserve/${roomId}/status`, { status });
    }

    async getTotalRoomsByReserveId(reserveId) {
        try {
            const response = await this.getAll(reserveId);
            return response.data.length;
        } catch (error) {
            console.error('Error fetching total rooms:', error);
            throw error;
        }
    }
}
