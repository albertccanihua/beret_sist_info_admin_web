import { CreateManyPacketSpecialityModel } from "./create-many-packet-speciality.model";

export class CreatePacketModel {

    public user_creator: number;
    public name: string;
    public description: string;
    public specialities: CreateManyPacketSpecialityModel[];

    constructor() {
        this.user_creator = null;
        this.name = '';
        this.description = '';
        this.specialities = [];
    }

    reset() {
        this.user_creator = null;
        this.name = '';
        this.description = '';
        this.specialities = [];
    }
}

