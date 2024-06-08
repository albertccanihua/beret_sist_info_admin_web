import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IManagementType } from 'src/app/interfaces/management-type/management-type.interface';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-management-types-create',
  templateUrl: './management-types-create.component.html',
  styleUrl: './management-types-create.component.scss'
})
export class ManagementTypesCreateComponent {

  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  isFormSubmitted: boolean = false;
  isFormLoading: boolean = false;

  createManagementTypeForm: FormGroup;

  types: any[] = [
    { id: 'type_document', name: 'Tipos de documento' },
    { id: 'type_role', name: 'Tipos de rol' },
    { id: 'type_gender', name: 'Tipos de género' },
    { id: 'type_financing', name: 'Tipos de financiamiento' },
    { id: 'type_status_treatment', name: 'Tipos de estado de tratamiento' },
  ];

  constructor(
    private _managementTypeService: ManagementTypeService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.createManagementTypeForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(250)]),
    }, { validators: confirmPasswordValidator });
  }

  ngOnInit() {
    this.menuBreadcrumb = [
      { label: 'Configuración' },
      { label: 'Tipos de datos', routerLink: '/configuration/management-types' },
      { label: 'Registrar' }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }


  submitForm() {
    this.isFormSubmitted = true;

    const isValid = this.createManagementTypeForm.valid;

    if (isValid === true) {
      this.isFormLoading = true;

      try {
        this._managementTypeService.create({
          type: this.createManagementTypeForm.value.type,
          name: this.createManagementTypeForm.value.name,
          description: this.createManagementTypeForm.value.description,
        }).subscribe((response: IApiResponse<IManagementType>) => {
          if (response.code === 201) {
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'El tipo de dato se registró correctamente', closable: true });
            this.isFormLoading = false;
            this.router.navigateByUrl('/configuration/management-types');
          };
        })
      } catch (error) {
        this.isFormLoading = false;
      }
    }
  }
}
