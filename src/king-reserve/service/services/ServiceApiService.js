// services/ServiceApiService.js
import axios from "axios";

const url_FakeApi = "https://my-json-server.typicode.com/CB-Sergio-AGV/dbs"; // Dirección de la API simulada

const http = axios.create({
    baseURL: url_FakeApi, // Base URL de la API de json-server
});

export class ServiceApiService {
    getAll() {
        return http.get('/services'); // Obtener todos los servicios
    }

    getById(id) {
        return http.get(`/services/${id}`); // Obtener un servicio por ID
    }

    create(serviceResource) {
        return http.post('/services', serviceResource); // Crear un nuevo servicio
    }

    update(id, service) {
        return http.put(`/services/${id}`, service); // Actualizar un servicio por ID
    }

    delete(id) {
        return http.delete(`/services/${id}`); // Eliminar un servicio por ID
    }
}
