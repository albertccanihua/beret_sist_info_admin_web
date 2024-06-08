export class UpdateManagementTypeModel {
    public id: number;
    public name: string;
    public description: string;
    public type: string;
    public status: boolean;

    constructor() {
        this.id = null;
        this.name = '';
        this.description = '';
        this.type = '';
        this.status = true;
    }
}