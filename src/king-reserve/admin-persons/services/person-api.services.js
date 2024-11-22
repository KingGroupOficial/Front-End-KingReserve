import axios from "axios";

const url_FakeApi = "http://localhost:5151/api/v1";

const http = axios.create({
    baseURL: url_FakeApi, // Corrected property name to baseURL
});

export class PersonApiService {
    getAll() {
        return http.get('/person');
    }

    getById(id) {
        return http.get(`/person/${id}`);
    }

    create(person) {
        return http.post('/person', person);
    }

    update(id, person) {
        return http.put(`/person/${id}`, person);
    }

    delete(id) {
        return http.delete(`/person/${id}`);
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


}