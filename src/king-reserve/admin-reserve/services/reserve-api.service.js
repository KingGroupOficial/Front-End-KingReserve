import axios from "axios";

// URL base de la API
const url_FakeApi = "http://localhost:5151/api/v1";

// Inicializar la instancia de Axios
const url = axios.create({
    baseURL: url_FakeApi,
});

// Configurar un interceptor para agregar el token de seguridad a cada solicitud
url.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Servicio de reservas
export class ReserveApiService {
    getAll() {
        return url.get('/reserve');
    }

    getById(id) {
        return url.get(`/reserve/${id}`);
    }

    create(reserve) {
        return url.post('/reserve', reserve);
    }

    update(id, reserve) {
        return url.put(`/reserve/${id}`, reserve);
    }

    setConditionFinished(reserveId) {
        return url.put(`/reserve/${reserveId}/condition-finished`);
    }

    setConditionActive(reserveId) {
        return url.put(`/reserve/${reserveId}/condition-active`);
    }

    delete(id) {
        return url.delete(`/reserve/${id}`);
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
