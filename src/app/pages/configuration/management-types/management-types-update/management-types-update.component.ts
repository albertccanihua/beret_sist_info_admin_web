import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IManagementType } from 'src/app/interfaces/management-type/management-type.interface';
import { IShowManagementTypeApiResponse } from 'src/app/interfaces/management-type/show-management-type-api-response.interface';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';

@Component({
  selector: 'app-management-types-update',
  templateUrl: './management-types-update.component.html',
  styleUrl: './management-types-update.component.scss'
})
export class ManagementTypesUpdateComponent {

  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  isFormSubmitted: boolean = false;
  isFormLoading: boolean = false;

  userId: string;
  updateManagementTypeForm: FormGroup;

  types: any[] = [
    { id: 'type_document', name: 'Tipos de documento' },
    { id: 'type_role', name: 'Tipos de rol' },
    { id: 'type_gender', name: 'Tipos de género' },
    { id: 'type_financing', name: 'Tipos de financiamiento' },
    { id: 'type_status_treatment', name: 'Tipos de estado de tratamiento' },
  ];
  typeStatus: any[] = [{ name: 'Activo', id: true }, { name: 'Inactivo', id: false }];

  constructor(
    private _managementTypeService: ManagementTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.updateManagementTypeForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(250)]),
      status: new FormControl(''),
    });
  }

  ngOnInit() {
    this.menuBreadcrumb = [
      { label: 'Configuración' },
      { label: 'Tipos de datos', routerLink: '/configuration/managemen-types' },
      { label: 'Actualizar' }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.showManagementType();
  }

  private showManagementType() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      this._managementTypeService.show(params.get('id')!).subscribe((data: IApiResponse<IShowManagementTypeApiResponse>) => {
        if (data.code == 200) {
          this.updateManagementTypeForm.setValue({
            type: data.result.type,
            name: data.result.name,
            description: data.result.description,
            status: data.result.status
          })
        }
      });
    });
  }

  submitForm() {
    this.isFormSubmitted = true;

    const isValid = this.updateManagementTypeForm.valid;

    if (isValid === true) {
      this.isFormLoading = true;

      try {
        this._managementTypeService.update({
          id: this.userId,
          type: this.updateManagementTypeForm.value.type,
          name: this.updateManagementTypeForm.value.name,
          description: this.updateManagementTypeForm.value.description,
          status: this.updateManagementTypeForm.value.status,
        }).subscribe((response: IApiResponse<IManagementType>) => {
          if (response.code === 200) {
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'El tipo de dato se actualizó correctamente', closable: true });
            this.isFormLoading = false;
            this.router.navigateByUrl('/configuration/management-types');
          }
        })
      } catch (error) {
        this.isFormLoading = false;
      }
    }
  }
}
