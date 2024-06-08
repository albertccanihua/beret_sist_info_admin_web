import { IManagementTypesApiFilters } from "../interfaces/management-type/management-types-api-filters.interface";

export class ManagementTypesFiltersModel implements IManagementTypesApiFilters {

    public id?: number;
    public type?: string;
    public page?: number;
    public limit?: number;

}