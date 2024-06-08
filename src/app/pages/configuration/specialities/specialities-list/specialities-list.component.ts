import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Pagination } from 'src/app/classes/pagination.class';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { IListSpecialitiesApiResponse } from 'src/app/interfaces/speciality/list-specialities-api-response.interface';
import { ISpecialitiesApiFilters } from 'src/app/interfaces/speciality/specialities-api-filters.interface';
import { SpecialitiesFiltersModel } from 'src/app/models/specialities-filters.model';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { SpecialityService } from 'src/app/services/speciality/speciality.service';


@Component({
  selector: 'app-specialities-list',
  templateUrl: './specialities-list.component.html',
  styleUrl: './specialities-list.component.scss'
})
export class SpecialitiesListComponent implements OnInit {

  first: number = 0;
  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  pagination: Pagination = new Pagination();

  specialities: IPaginateEntityApiResponse<IListSpecialitiesApiResponse[]> = { data: [], page: 1, total_data: 0, total_page: 0 };
  specialityFilters: ISpecialitiesApiFilters;

  typeStatus: any[] = [{ name: 'Activo', id: 1 }, { name: 'Inactivo', id: 0 }];

  constructor(
    private _specliaityService: SpecialityService,
    private _managementTypeService: ManagementTypeService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
  ) {
    this.specialityFilters = new SpecialitiesFiltersModel();
    this.specialityFilters = { ...this.pagination.getAsObject() };
  }

  ngOnInit() {
    this.menuBreadcrumb = [{ label: 'Configuración' }, { label: 'Especialidades' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.getSpecialityList();
  }

  // PAGE EVENTS
  // ==========================
  onPageChange(event: any) {
    this.definePaginationData(event);
    this.getSpecialityList();
  }

  onConfirmDeleteSpeciality(event: Event, id: string) {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'La especialidad se eliminará permanentemente, desea continuar?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => this.deleteSpeciality(id)
    });
  }

  onSearch() {
    this.pagination.reset();
    this.definePaginationData({ page: 0, rows: this.pagination.limit });
    this.specialityFilters = { ...this.specialityFilters, page: this.pagination.page, limit: this.pagination.limit };
    this.getSpecialityList();
  }

  onFilterReset() {
    this.pagination.reset();
    this.definePaginationData({ page: 0, rows: this.pagination.limit });
    this.specialityFilters = new SpecialitiesFiltersModel();
    this.specialityFilters = { ...this.pagination.getAsObject() };
    this.getSpecialityList();
  }

  // METHODS
  // ==========================
  private getSpecialityList() {
    this._specliaityService.list(this.specialityFilters).subscribe(response => {
      this.specialities = response.result;
    });
  }

  private deleteSpeciality(id: string) {
    this._specliaityService.delete(id).subscribe((response) => {
      if (response.code === 200) {
        this._messageService.add({
          severity: 'success',
          summary: 'Genial!',
          detail: 'La especialidad se eliminó correctamente',
          life: 3000
        });
        this.getSpecialityList();
      }
    });
  }

  private definePaginationData(event: any) {
    this.first = event.page === 0 ? 0 : event.page * event.rows;
    this.specialityFilters.page = event.page + 1;
  }

}
