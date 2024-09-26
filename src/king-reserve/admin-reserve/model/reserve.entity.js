export class Reservation {
    constructor(id, name, dateStart, dateEnd, objective, condition, duration) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.objective = objective;
        this.condition = condition;
        this.duration = duration !== undefined ? duration : this.calculateDuration();
    }

    static fromDisplayableReservation(displayableReservation) {
        return new Reservation(
            displayableReservation.id,
            displayableReservation.name,
            displayableReservation.dateStart,
            displayableReservation.dateEnd,
            displayableReservation.objective,
            displayableReservation.condition,
            displayableReservation.duration
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
            duration: reservation.duration
        };
    }

    calculateDuration() {
        const diffTime = this.dateEnd.getTime() - this.dateStart.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}
