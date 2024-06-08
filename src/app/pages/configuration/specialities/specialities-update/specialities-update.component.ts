import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IShowSpecialityApiResponse } from 'src/app/interfaces/speciality/show-speciality-api-response.interface';
import { ISpeciality } from 'src/app/interfaces/speciality/speciality.interface';
import { SpecialityService } from 'src/app/services/speciality/speciality.service';

@Component({
  selector: 'app-specialities-update',
  templateUrl: './specialities-update.component.html',
  styleUrl: './specialities-update.component.scss'
})
export class SpecialitiesUpdateComponent {

  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  isFormSubmitted: boolean = false;
  isFormLoading: boolean = false;

  specialityId: string;
  updateSpecialityForm: FormGroup;

  typeStatus: any[] = [{ name: 'Activo', id: true }, { name: 'Inactivo', id: false }];

  constructor(
    private _specialityService: SpecialityService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.updateSpecialityForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(255)]),
      status: new FormControl(''),
    });
  }

  ngOnInit() {
    this.menuBreadcrumb = [
      { label: 'Configuración' },
      { label: 'Especialidades', routerLink: '/specialities/administration' },
      { label: 'Actualizar' }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.showSpeciality();
  }

  private showSpeciality() {
    this.route.paramMap.subscribe(params => {
      this.specialityId = params.get('id')!;
      this._specialityService.show(params.get('id')!).subscribe((data: IApiResponse<IShowSpecialityApiResponse>) => {
        if (data.code == 200) {
          this.updateSpecialityForm.setValue({
            code: data.result.code,
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

    const isValid = this.updateSpecialityForm.valid;

    if (isValid === true) {
      this.isFormLoading = true;

      try {
        this._specialityService.update({
          id: this.specialityId,
          code: this.updateSpecialityForm.value.code,
          name: this.updateSpecialityForm.value.name,
          status: this.updateSpecialityForm.value.status,
          description: this.updateSpecialityForm.value.description
        }).subscribe((response: IApiResponse<ISpeciality>) => {
          if (response.code === 200) {
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'La especialidad se actualizó correctamente', closable: true });
            this.isFormLoading = false;
            this.router.navigateByUrl('/configuration/specialities');
          }
          ;
        })
      } catch (error) {
        this.isFormLoading = false;
      }
    }
  }
}
