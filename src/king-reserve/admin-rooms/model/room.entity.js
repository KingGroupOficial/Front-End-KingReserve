export class Room {
    constructor(id, name, area, status, reservationId) {
        this.id = id;
        this.name = name;
        this.area = area;
        this.status = status;
        this.reservationId = reservationId;
    }

    static fromDisplayableRoom(displayableRoom) {
        return new Room(
            displayableRoom.id,
            displayableRoom.name,
            displayableRoom.area,
            displayableRoom.status,
            displayableRoom.reservationId
        );
    }

    static toDisplayableRoom(room) {
        return {
            id: room.id,
            name: room.name,
            area: room.area,
            status: room.status,
            reservationId: room.reservationId
        };
    }
}