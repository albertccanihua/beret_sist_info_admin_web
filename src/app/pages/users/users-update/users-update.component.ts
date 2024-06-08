import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DateHelper } from 'src/app/helpers/date.helper';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import {
    IGetManagementTypesApiResponse
} from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { IShowUserApiResponse } from 'src/app/interfaces/user/show-user-api-response.interface';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
    selector: 'app-users-update',
    templateUrl: './users-update.component.html',
    styleUrl: './users-update.component.scss'
})
export class UsersUpdateComponent {

    menuBreadcrumb: MenuItem[] | undefined;
    home: MenuItem | undefined;
    isFormSubmitted: boolean = false;
    isFormLoading: boolean = false;

    userId: string;
    updateUserForm: FormGroup;

    typeDocuments: IGetManagementTypesApiResponse[] = [];
    typeGenders: IGetManagementTypesApiResponse[] = [];
    typeRoles: IGetManagementTypesApiResponse[] = [];
    typeStatus: any[] = [{ name: 'Activo', id: true }, { name: 'Inactivo', id: false }];

    constructor(
        private _userService: UserService,
        private _managementTypeService: ManagementTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService
    ) {
        this.updateUserForm = new FormGroup({
            document_number: new FormControl('', [Validators.required, Validators.minLength(8)]),
            dob: new FormControl(''),
            name: new FormControl('', [Validators.required]),
            paternal_surname: new FormControl('', [Validators.required]),
            maternal_lastname: new FormControl(''),
            email: new FormControl(''),
            phone_number: new FormControl(''),
            status: new FormControl(''),
            type_document: new FormControl('', [Validators.required]),
            type_gender: new FormControl('', [Validators.required]),
            type_role: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {
        this.menuBreadcrumb = [
            { label: 'Usuarios' },
            { label: 'Administración', routerLink: '/users/administration' },
            { label: 'Actualizar' }
        ];
        this.home = { icon: 'pi pi-home', routerLink: '/' };

        this.getManagementTypes();
        this.showUser();
    }

    private showUser() {
        this.route.paramMap.subscribe(params => {
            this.userId = params.get('id')!;
            this._userService.show(params.get('id')!).subscribe((data: IApiResponse<IShowUserApiResponse>) => {
                if (data.code == 200) {
                    this.updateUserForm.setValue({
                        document_number: data.result.document_number,
                        dob: DateHelper.invertDate(data.result.dob, '-', '/'),
                        name: data.result.name,
                        paternal_surname: data.result.paternal_surname,
                        maternal_lastname: data.result.maternal_lastname,
                        email: data.result.email,
                        phone_number: data.result.phone_number,
                        status: data.result.status,
                        type_document: data.result.type_document.id,
                        type_gender: data.result.type_gender.id,
                        type_role: data.result.type_role.id
                    })
                }
            });
        });
    }

    private getManagementTypes() {
        this._managementTypeService.get({ type: 'type_document', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeDocuments = data.result;
        });
        this._managementTypeService.get({ type: 'type_gender', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeGenders = data.result;
        });
        this._managementTypeService.get({ type: 'type_role', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeRoles = data.result;
        });
    }

    submitForm() {
        this.isFormSubmitted = true;

        const isValid = this.updateUserForm.valid;

        if (isValid === true) {
            this.isFormLoading = true;

            try {
                this._userService.update({
                    id: this.userId,
                    document_number: this.updateUserForm.value.document_number,
                    dob: DateHelper.invertDate(this.updateUserForm.value.dob, '/', '-'),
                    name: this.updateUserForm.value.name,
                    paternal_surname: this.updateUserForm.value.paternal_surname,
                    maternal_lastname: this.updateUserForm.value.maternal_lastname,
                    email: this.updateUserForm.value.email,
                    phone_number: this.updateUserForm.value.phone_number,
                    type_document: this.updateUserForm.value.type_document,
                    type_gender: this.updateUserForm.value.type_gender,
                    type_role: this.updateUserForm.value.type_role
                }).subscribe((response: IApiResponse<IUser>) => {
                    if (response.code === 200) {
                        this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'El usuario se actualizó correctamente', closable: true });
                        this.isFormLoading = false;
                        this.router.navigateByUrl('/users/administration');
                    }
                })
            } catch (error) {
                this.isFormLoading = false;
            }
        }
    }
}
