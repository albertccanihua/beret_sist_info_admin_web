import { CreateManyPacketSpecialityModel } from "./create-many-packet-speciality.model";
import { UserCreatorModel } from "./user-creator.model";

export class UpdatePacketModel {

    public id: number;
    public name: string;
    public description: string | null;
    public status: boolean;
    public specialities: CreateManyPacketSpecialityModel[];

    constructor() {
        this.id = null;
        this.name = '';
        this.description = '';
        this.status = true;
        this.specialities = [];
    }
}