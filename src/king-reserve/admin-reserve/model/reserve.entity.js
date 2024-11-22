export class Reservation {
    constructor(id, name, dateStart, dateEnd, objective, condition, duration) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;  // Puede seguir siendo string si el backend lo recibe como tal
        this.dateEnd = dateEnd;      // Lo mismo para dateEnd
        this.objective = objective;
        this.condition = condition;
        this.duration = duration;    // Usar la duración que viene del backend directamente
    }

    static fromDisplayableReservation(displayableReservation) {
        return new Reservation(
            displayableReservation.id,
            displayableReservation.name,
            displayableReservation.dateStart,
            displayableReservation.dateEnd,
            displayableReservation.objective,
            displayableReservation.condition,
            displayableReservation.duration  // El backend envía la duración calculada
        );
    }

    static toDisplayableReservation(reservation) {
        return {
            id: reservation.id,
            name: reservation.name,
            dateStart: reservation.dateStart,
            dateEnd: reservation.dateEnd,
            objective: reservation.objective,
            condition: reservation.condition,
            duration: reservation.duration  // Mantén la duración tal cual como viene del backend
        };
    }
}
