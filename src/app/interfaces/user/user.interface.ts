export interface IUser {
    id: number;
    document_number: string;
    dob: string;
    name: string;
    paternal_surname: string;
    maternal_lastname: string;
    email: string;
    phone_number: null;
    username: string;
    status: boolean,
    type_document: number;
    type_gender: number;
    type_role: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}