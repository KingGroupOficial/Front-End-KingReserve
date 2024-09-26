import http from "@/shared/services/http-common.js";

export class PersonApiService {
    getAll() {
        return http.get('/persons');
    }

    getById(id) {
        return http.get(`/persons/${id}`);
    }

    create(person) {
        return http.post('/persons', person);
    }

    update(id, person) {
        return http.put(`/persons/${id}`, person);
    }

    delete(id) {
        return http.delete(`/persons/${id}`);
    }

    findByName(name) {
        return http.get(`/persons?name=${name}`);
    }

    getPersonsGroupedByBatchId() {
        return this.getAll().then(response => {
            const persons = response.data;

            const groupedByBatchId = {};
            persons.forEach(person => {
                const batchId = person.batchId;
                if (!groupedByBatchId[batchId]) {
                    groupedByBatchId[batchId] = [];
                }
                groupedByBatchId[batchId].push(person);
            });

            return Object.entries(groupedByBatchId).map(([batchId, persons]) => ({
                batchId: parseInt(batchId),
                count: persons.length,
                persons: persons
            }));
        });
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

    getPersonCountry() {
        return this.getAll().then(response => {
            const persons = response.data;
            const groupedByCountry = {};
            persons.forEach(person => {
                const country = person.country;
                if (!groupedByCountry[country]) {
                    groupedByCountry[country] = [];
                }
                groupedByCountry[country].push(person);
            });
            return Object.entries(groupedByCountry).map(([country, persons]) => ({
                country: country,
                count: persons.length,
                persons: persons
            }));
        });
    }
}