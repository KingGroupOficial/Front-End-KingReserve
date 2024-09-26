import { Origin } from "./origin.entity.js";

export class Person {
    constructor(id, name, age, date, origin, observations, roomId) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.date = date;
        this.origin = origin;
        this.observations = observations;
        this.roomId = roomId;
    }

    static fromDisplayablePerson(displayablePerson) {
        return new Person(
            displayablePerson.id,
            displayablePerson.name,
            displayablePerson.age,
            displayablePerson.date,
            displayablePerson.origin,
            displayablePerson.observations,
            displayablePerson.roomId
        );
    }

    static toDisplayablePerson(person) {
        return {
            id: person.id,
            name: person.name,
            age: person.age,
            date: person.date,
            origin: person.origin,
            observations: person.observations,
            roomId: person.roomId
        };
    }
}
