export interface IUsersApiFilters {
    id?: number;
    document_number?: string;
    name?: string;
    paternal_surname?: string;
    maternal_lastname?: string;
    status?: boolean;
    type_document?: number;
    type_role?: number;
    page?: number;
    limit?: number;
}