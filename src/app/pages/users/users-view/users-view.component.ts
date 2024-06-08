import {Component} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
    IGetManagementTypesApiResponse
} from "../../../interfaces/management-type/get-management-types-api-response.interface";
import {UserService} from "../../../services/user/user.service.service";
import {ManagementTypeService} from "../../../services/management-type/management-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IApiResponse} from "../../../interfaces/api-response.interface";
import {IShowUserApiResponse} from "../../../interfaces/user/show-user-api-response.interface";
import {DateHelper} from "../../../helpers/date.helper";
import {UpdateUserModel} from "../../../models/update-user.model";

@Component({
    selector: 'app-users-view',
    templateUrl: './users-view.component.html',
    styleUrl: './users-view.component.scss'
})
export class UsersViewComponent {

    menuBreadcrumb: MenuItem[] | undefined;
    home: MenuItem | undefined;
    isFormSubmitted: boolean = false;
    isFormLoading: boolean = false;

    userId: string;
    user: IShowUserApiResponse | undefined;
    updateUserForm: UpdateUserModel;

    typeDocuments: IGetManagementTypesApiResponse[] = [];
    typeGenders: IGetManagementTypesApiResponse[] = [];
    typeRoles: IGetManagementTypesApiResponse[] = [];

    constructor(
        private _userService: UserService,
        private _managementTypeService: ManagementTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService
    ) {
        this.updateUserForm = new UpdateUserModel();
    }

    ngOnInit() {
        this.menuBreadcrumb = [
            {label: 'Usuarios'},
            {label: 'Administración', routerLink: '/users/administration'},
            {label: 'Ver detalle'}
        ];
        this.home = {icon: 'pi pi-home', routerLink: '/'};

        this.getManagementTypes();
        this.showUser();
    }

    private showUser() {
        this.route.paramMap.subscribe(params => {
            this.userId = params.get('id')!;
            this._userService.show(params.get('id')!).subscribe((data: IApiResponse<IShowUserApiResponse>) => {
                if (data.code == 200) {
                    this.user = data.result;
                    this.user.dob = DateHelper.invertDate(this.user.dob, '-', '/');
                    this.updateUserForm = this.user as UpdateUserModel;
                }
            });
        });
    }

    private getManagementTypes() {
        this._managementTypeService.get({type: 'type_document', status: 1}).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeDocuments = data.result;
        });
        this._managementTypeService.get({type: 'type_gender', status: 1}).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeGenders = data.result;
        });
        this._managementTypeService.get({type: 'type_role', status: 1}).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeRoles = data.result;
        });
    }
}
