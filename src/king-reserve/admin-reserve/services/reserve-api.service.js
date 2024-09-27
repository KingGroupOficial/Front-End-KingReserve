import axios from "axios";

const url_FakeApi = "https://66f71709b5d85f31a341fe55.mockapi.io";

const url = axios.create({
    baseURL: url_FakeApi, // Corrected property name to baseURL
});

export class ReserveApiService {

    getAll() {
        return url.get('/reservations');
    }

    getById(id) {
        return url.get(`/reservations/${id}`);
    }

    create(reserve) {
        return url.post('/reservations', reserve);
    }

    update(id, reserve) {
        return url.put(`/reservations/${id}`, reserve);
    }

    delete(id) {
        return url.delete(`/reservations/${id}`);
    }

    async getTotalReserves() {
        try {
            const response = await this.getAll();
            return response.data.length;
        } catch (error) {
            console.error('Error fetching total reserves:', error);
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