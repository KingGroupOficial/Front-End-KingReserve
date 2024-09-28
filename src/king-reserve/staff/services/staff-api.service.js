import axios from "axios";

const url_FakeApi = "https://66f74e74b5d85f31a3426eb5.mockapi.io";

const http = axios.create({
    baseURL: url_FakeApi, // Base URL de la API de MockAPI
});

export class StaffApiService {

    getAll() {
        return http.get('/staff'); // Obtener todos los registros de staff
    }

    getById(id) {
        return http.get(`/staff/${id}`); // Obtener un registro de staff por su ID
    }

    create(staffResource) {
        return http.post('/staff', staffResource); // Crear un nuevo registro de staff
    }

    update(id, staff) {
        return http.put(`/staff/${id}`, staff); // Actualizar un registro de staff por su ID
    }

    delete(id) {
        return http.delete(`/staff/${id}`); // Eliminar un registro de staff por su ID
    }

    findByName(name) {
        return http.get(`/staff?name=${name}`); // Buscar registros de staff por nombre
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
