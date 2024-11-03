// models/Service.js

export class Service {
    constructor(id, name, status) {
        this.id = id; // ID único del servicio
        this.name = name; // Nombre del servicio
        this.status = status; // Estado del servicio (e.g., "Activo", "Inactivo")
    }

    // Método estático para crear un nuevo servicio desde un objeto de servicio
    static fromDisplayableService(displayableService) {
        return new Service(
            displayableService.id,
            displayableService.name,
            displayableService.status
        );
    }

    // Método estático para convertir un servicio a un formato displayable
    static toDisplayableService(service) {
        return {
            id: service.id,
            name: service.name,
            status: service.status
        };
    }
}
