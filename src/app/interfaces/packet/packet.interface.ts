export interface IPacket {
    id: number;
    name: string;
    user_creator: number;
    description?: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}