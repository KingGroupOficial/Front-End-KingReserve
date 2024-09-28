export class Person {
    constructor(id, name, age, date, country, city, district, observations, roomId) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.date = date;
        this.country = country;
        this.city = city;
        this.district = district;
        this.observations = observations;
        this.roomId = roomId;
    }

    static fromDisplayablePerson(displayablePerson) {
        return new Person(
            displayablePerson.id,
            displayablePerson.name,
            displayablePerson.age,
            displayablePerson.date,
            displayablePerson.country,
            displayablePerson.city,
            displayablePerson.district,
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
            country: person.country,
            city: person.city,
            district: person.district,
            observations: person.observations,
            roomId: person.roomId
        };
    }
}