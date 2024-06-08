import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {Pagination} from 'src/app/classes/pagination.class';
import {IPaginateEntityApiResponse} from 'src/app/interfaces/paginate-entity-api-response.interface';
import {IListUserApiResponse} from 'src/app/interfaces/user/list-users-api-response.interface';
import {IUsersApiFilters} from 'src/app/interfaces/user/users-api-filters.interface';
import {UserFiltersModel} from 'src/app/models/user-filters.model';
import {UserService} from 'src/app/services/user/user.service.service';
import {
    IGetManagementTypesApiResponse
} from "../../../interfaces/management-type/get-management-types-api-response.interface";
import {ManagementTypeService} from "../../../services/management-type/management-type.service";
import {IApiResponse} from "../../../interfaces/api-response.interface";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

    first: number = 0;
    menuBreadcrumb: MenuItem[] | undefined;
    home: MenuItem | undefined;
    pagination: Pagination = new Pagination();

    users: IPaginateEntityApiResponse<IListUserApiResponse[]> = {data: [], page: 1, total_data: 0, total_page: 0};
    userFilters: IUsersApiFilters;

    typeDocuments: IGetManagementTypesApiResponse[] = [];
    typeRoles: IGetManagementTypesApiResponse[] = [];

    constructor(
        private _userService: UserService,
        private _managementTypeService: ManagementTypeService,
        private _confirmationService: ConfirmationService,
        private _messageService: MessageService
    ) {
        this.userFilters = new UserFiltersModel();
        this.userFilters = {...this.pagination.getAsObject()};
    }

    ngOnInit() {
        this.menuBreadcrumb = [{label: 'Usuarios'}, {label: 'Administración'}];
        this.home = {icon: 'pi pi-home', routerLink: '/'};

        this.getUserList();
        this.getManagementTypes();
    }

    // PAGE EVENTS
    // ==========================
    onPageChange(event: any) {
        this.definePaginationData(event);
        this.getUserList();
    }

    onConfirmDeleteUser(event: Event, id: string) {
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'El usuario se eliminará permanentemente, desea continuar?',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-sm',
            acceptLabel: 'Confirmar',
            rejectLabel: 'Cancelar',
            accept: () => this.deleteUser(id)
        });
    }

    onSearch() {
        this.pagination.reset();
        this.definePaginationData({page: 0, rows: this.pagination.limit});
        this.userFilters = {...this.userFilters, page: this.pagination.page, limit: this.pagination.limit};
        this.getUserList();
    }

    onFilterReset() {
        this.pagination.reset();
        this.definePaginationData({page: 0, rows: this.pagination.limit});
        this.userFilters = new UserFiltersModel();
        this.userFilters = {...this.pagination.getAsObject()};
        this.getUserList();
    }

    // METHODS
    // ==========================

    private getManagementTypes() {
        this._managementTypeService.get({type: 'type_document', status: 1}).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeDocuments = data.result;
        });
        this._managementTypeService.get({type: 'type_role', status: 1}).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeRoles = data.result;
        });
    }

    private getUserList() {
        this._userService.list(this.userFilters).subscribe(response => {
            this.users = response.result;
        });
    }

    private deleteUser(id: string) {
        this._userService.delete(id).subscribe((response) => {
            if (response.code === 200) {
                this._messageService.add({
                    severity: 'success',
                    summary: 'Genial!',
                    detail: 'El usuario se eliminó correctamente',
                    life: 3000
                });
                this.getUserList();
            }
        });
    }

    private definePaginationData(event: any) {
        this.first = event.page === 0 ? 0 : event.page * event.rows;
        this.userFilters.page = event.page + 1;
    }
}
