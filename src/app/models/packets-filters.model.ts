import { IPacketsApiFilters } from "../interfaces/packet/packets-api-filters.interface";

export class PacketsFiltersModel implements IPacketsApiFilters {

    id?: number;
    name?: string;
    status?: boolean;
    page?: number;
    limit?: number;

}