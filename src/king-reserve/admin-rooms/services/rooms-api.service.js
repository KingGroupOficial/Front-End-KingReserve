import axios from "axios";

const url_FakeApi = "http://localhost:5151/api/v1";

const url = axios.create({
    baseURL: url_FakeApi, // Corrected property name to baseURL
});

export class RoomsApiService {

    getAllByReserveId(reserveId) {
        return url.get(`/reserve/${reserveId}/rooms`);
    }

    getRoomById(reserveId, roomId) {
        return url.get(`/reserve/${reserveId}/rooms/${roomId}`);
    }

    create(reserveId, room) {
        return url.post(`/reserve/add-room`, room);
    }

    update(reserveId, roomId, room) {
        return url.put(`/reserve/${reserveId}/rooms/${roomId}`, room);
    }

    delete(reserveId, roomId) {
        return url.delete(`/reserve/${reserveId}/room`, { data: { roomId } });
    }



    updateRoomStatus(roomId, status) {
        return url.put(`/reserve/${roomId}/status`, { status });
    }

    async getTotalRoomsByReserveId(reserveId) {
        try {
            const response = await this.getAllByReserveId(reserveId);
            return response.data.length;
        } catch (error) {
            console.error('Error fetching total rooms:', error);
            throw error;
        }
    }
}
