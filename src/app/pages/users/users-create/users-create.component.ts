import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DateHelper } from 'src/app/helpers/date.helper';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { UserService } from 'src/app/services/user/user.service.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.scss'
})
export class UsersCreateComponent {

  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  isFormSubmitted: boolean = false;
  isFormLoading: boolean = false;

  createUserForm: FormGroup;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeGenders: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _userService: UserService,
    private _managementTypeService: ManagementTypeService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.createUserForm = new FormGroup({
      document_number: new FormControl('', [Validators.required, Validators.minLength(8)]),
      dob: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      paternal_surname: new FormControl('', [Validators.required]),
      maternal_lastname: new FormControl(''),
      email: new FormControl(''),
      phone_number: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      status: new FormControl(true),
      type_document: new FormControl('', [Validators.required]),
      type_gender: new FormControl('', [Validators.required]),
      type_role: new FormControl('', [Validators.required])
    }, { validators: confirmPasswordValidator });
  }

  ngOnInit() {
    this.menuBreadcrumb = [
      { label: 'Usuarios' },
      { label: 'Administración', routerLink: '/users/administration' },
      { label: 'Registrar' }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.getManagementTypes();
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

    const isValid = this.createUserForm.valid;

    if (isValid === true) {
      this.isFormLoading = true;

      try {
        this._userService.create({
          document_number: this.createUserForm.value.document_number,
          dob: DateHelper.invertDate(this.createUserForm.value.dob, '/', '-'),
          name: this.createUserForm.value.name,
          paternal_surname: this.createUserForm.value.paternal_surname,
          maternal_lastname: this.createUserForm.value.maternal_lastname,
          email: this.createUserForm.value.email,
          phone_number: this.createUserForm.value.phone_number,
          username: this.createUserForm.value.username,
          password: this.createUserForm.value.password,
          status: true,
          type_document: this.createUserForm.value.type_document,
          type_gender: this.createUserForm.value.type_gender,
          type_role: this.createUserForm.value.type_role
        }).subscribe((response: IApiResponse<IUser>) => {
          if (response.code === 201) {
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'El usuario se registró correctamente', closable: true });
            this.isFormLoading = false;
            this.router.navigateByUrl('/users/administration');
          };
        })
      } catch (error) {
        this.isFormLoading = false;
      }
    }
  }
}
