export class ManagementType {
    public id: number;
    public code: string;
    public name: string;
    public description: string;
    public data: string;
    public type: string;
    public status: boolean;

    constructor() {
        this.id = null;
        this.code = '';
        this.name = '';
        this.description = '';
        this.data = '';
        this.type = '';
        this.status = true;
    }
}