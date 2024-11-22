import axios from "axios";

const url_FakeApi = "https://kingreserve-gqc8ayfabyghb3cw.brazilsouth-01.azurewebsites.net/api/v1";

const http = axios.create({
    baseURL: url_FakeApi, // Base URL de la API de MockAPI
});

// Configurar un interceptor para agregar el token de seguridad a cada solicitud
http.interceptors.request.use(
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

export class StaffApiService {

    getAll() {
        return http.get('/staffs'); // Obtener todos los registros de staff
    }

    getById(id) {
        return http.get(`/staffs/${id}`); // Obtener un registro de staff por su ID
    }

    create(staffResource) {
        return http.post('/staffs', staffResource); // Crear un nuevo registro de staff
    }

    update(id, staff) {
        return http.put(`/staffs/${id}`, staff); // Actualizar un registro de staff por su ID
    }

    delete(id) {
        return http.delete(`/staffs/${id}`); // Eliminar un registro de staff por su ID
    }

    findByName(name) {
        return http.get(`/staffs?name=${name}`); // Buscar registros de staff por nombre
    }

    // Obtener todos los staffs agrupados por su ID de batch
    getStaffsGroupedByBatchId() {
        return this.getAll().then(response => {
            const staffs = response.data;

            const groupedByBatchId = {};
            staffs.forEach(staff => {
                const batchId = staff.batchId;
                if (!groupedByBatchId[batchId]) {
                    groupedByBatchId[batchId] = [];
                }
                groupedByBatchId[batchId].push(staff);
            });

            return Object.entries(groupedByBatchId).map(([batchId, staffs]) => ({
                batchId: parseInt(batchId),
                count: staffs.length,
                staffs: staffs
            }));
        });
    }

    // Obtener el número total de staffs
    async getTotalStaffs() {
        try {
            const response = await this.getAll();
            return response.data.length;
        } catch (error) {
            console.error('Error fetching total staffs:', error);
            throw error;
        }
    }

    // Agrupar staffs por país
    getStaffCountry() {
        return this.getAll().then(response => {
            const staffs = response.data;
            const groupedByCountry = {};
            staffs.forEach(staff => {
                const country = staff.country;
                if (!groupedByCountry[country]) {
                    groupedByCountry[country] = [];
                }
                groupedByCountry[country].push(staff);
            });
            return Object.entries(groupedByCountry).map(([country, staffs]) => ({
                country: country,
                count: staffs.length,
                staffs: staffs
            }));
        });
    }
}
