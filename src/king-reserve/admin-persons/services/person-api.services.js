import axios from "axios";

// URL base de la API
const url_FakeApi = "https://kingreserve-gqc8ayfabyghb3cw.brazilsouth-01.azurewebsites.net/api/v1";

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

// Servicio para el manejo de Person
export class PersonApiService {
    getAll() {
        return url.get('/person');
    }

    getById(id) {
        return url.get(`/person/${id}`);
    }

    create(person) {
        return url.post('/person', person);
    }

    update(id, person) {
        if (!id) {
            console.error("Error: Missing ID for update operation.", person);
            throw new Error("Person ID is required.");
        }
        console.log("Sending PUT request to update person with ID:", id);
        return url.put(`/person/${id}`, person);
    }


    delete(id) {
        if (!id) {
            console.error("Error: Missing ID for delete operation.");
            throw new Error("Person ID is required.");
        }
        console.log("Sending DELETE request for person with ID:", id);
        return url.delete(`/person/${id}`);
    }


    async getTotalPersons() {
        try {
            const response = await this.getAll();
            return response.data.length;
        } catch (error) {
            console.error('Error fetching total persons:', error);
            throw error;
        }
    }

    async getPersonsGroupedByStatus(statusField = 'status') {
        try {
            const response = await this.getAll();
            const persons = response.data;

            return persons.reduce((acc, person) => {
                const status = person[statusField] || 'Unknown';
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {});
        } catch (error) {
            console.error('Error grouping persons by status:', error);
            throw error;
        }
    }
}
