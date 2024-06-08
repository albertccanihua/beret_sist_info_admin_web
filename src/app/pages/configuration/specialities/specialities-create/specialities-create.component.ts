import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DateHelper } from 'src/app/helpers/date.helper';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { ISpeciality } from 'src/app/interfaces/speciality/speciality.interface';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { SpecialityService } from 'src/app/services/speciality/speciality.service';
import { UserService } from 'src/app/services/user/user.service.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-specialities-create',
  templateUrl: './specialities-create.component.html',
  styleUrl: './specialities-create.component.scss'
})
export class SpecialitiesCreateComponent {
  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  isFormSubmitted: boolean = false;
  isFormLoading: boolean = false;

  createSpecialityForm: FormGroup;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeGenders: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  authenticatedUserId: number = 0;

  constructor(
    private _specialityService: SpecialityService,
    private _managementTypeService: ManagementTypeService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.createSpecialityForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(255)]),
    }, { validators: confirmPasswordValidator });
  }

  ngOnInit() {
    this.menuBreadcrumb = [
      { label: 'Configuración' },
      { label: 'Especialidades', routerLink: '/specialities/administration' },
      { label: 'Registrar' }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.getManagementTypes();

    this.userService.currentUserId.subscribe(id => {
      this.authenticatedUserId = id
    })
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

    const isValid = this.createSpecialityForm.valid;

    if (isValid === true) {
      this.isFormLoading = true;

      try {
        this._specialityService.create({
          code: this.createSpecialityForm.value.code,
          name: this.createSpecialityForm.value.name,
          description: this.createSpecialityForm.value.description,
          user_creator: this.authenticatedUserId,
        }).subscribe((response: IApiResponse<ISpeciality>) => {
          if (response.code === 201) {
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'La especialidad se registró correctamente', closable: true });
            this.isFormLoading = false;
            this.router.navigateByUrl('/configuration/specialities');
          };
        })
      } catch (error) {
        this.isFormLoading = false;
      }
    }
  }
}
