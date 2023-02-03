export class User { 
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    birthDate: number | undefined;
    street: string | undefined;
    zipCode: number | undefined;
    city: string | undefined;

    constructor(obj?: any) { // mit dem Fragezeichen können wir sagen, dass wir das Objekt optional einfügen können (Nutzer bauen ohne dieses Objekt)
            this.firstName = obj ? obj.firstName : ''; //If-else Abfrage: obj existiert? Dann obj.firstName ansonsten ''
            this.lastName = obj ? obj.lastName : ''; //If-else Abfrage: obj existiert? Dann obj.firstName ansonsten ''
            this.email = obj ? obj.email : ''; //If-else Abfrage: obj existiert? Dann obj.firstName ansonsten ''
            this.birthDate = obj ? obj.birthDate : ''; //If-else Abfrage: obj existiert? Dann obj.firstName ansonsten ''
            this.street = obj ? obj.street : ''; //If-else Abfrage: obj existiert? Dann obj.firstName ansonsten ''
            this.zipCode = obj ? obj.zipCode : ''; //If-else Abfrage: obj existiert? Dann obj.firstName ansonsten ''
            this.city = obj ? obj.city : ''; //If-else Abfrage: obj existiert? Dann obj.firstName ansonsten ''
    }
    // Das ganze muss verknüpft werden, dazu in user.component.ts eine Variable anlegen

    public toJSON() { // wie soll das JSON aussehen von dialog-add-user? Welche Daten sollen gespeichert werden?
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city
        }
    }
}

