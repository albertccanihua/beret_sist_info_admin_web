export class CreateSpecialityModel {
    public code: string;
    public name: string;
    public description: string;
    public user_creator: number;

    constructor() {
        this.code = '';
        this.name = '';
        this.description = '';
        this.user_creator = null;
    }

    reset() {
        this.code = '';
        this.name = '';
        this.description = '';
        this.user_creator = null;
    }
}