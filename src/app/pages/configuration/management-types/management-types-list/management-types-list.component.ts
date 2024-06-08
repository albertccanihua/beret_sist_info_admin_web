import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Pagination } from 'src/app/classes/pagination.class';
import { IListManagementTypesApiResponse } from 'src/app/interfaces/management-type/list-management-types-api-response.interface';
import { IManagementTypesApiFilters } from 'src/app/interfaces/management-type/management-types-api-filters.interface';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { ManagementTypesFiltersModel } from 'src/app/models/management-types-filters.model';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';

@Component({
  selector: 'app-management-types-list',
  templateUrl: './management-types-list.component.html',
  styleUrl: './management-types-list.component.scss'
})
export class ManagementTypesListComponent implements OnInit {

  first: number = 0;
  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  pagination: Pagination = new Pagination();

  managementTypes: IPaginateEntityApiResponse<IListManagementTypesApiResponse[]> = { data: [], page: 1, total_data: 0, total_page: 0 };
  managementTypesFilters: IManagementTypesApiFilters;

  types: any[] = [
    { id: 'type_document', name: 'Tipos de documento' },
    { id: 'type_role', name: 'Tipos de rol' },
    { id: 'type_gender', name: 'Tipos de género' },
    { id: 'type_financing', name: 'Tipos de financiamiento' },
    { id: 'type_status_treatment', name: 'Tipos de estado de tratamiento' },
  ];

  constructor(
    private _managementTypeService: ManagementTypeService,
  ) {
    this.managementTypesFilters = new ManagementTypesFiltersModel();
    this.managementTypesFilters = { ...this.pagination.getAsObject() };
  }

  ngOnInit() {
    this.menuBreadcrumb = [{ label: 'Configuración' }, { label: 'Tipos de datos' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  // PAGE EVENTS
  // ==========================
  onPageChange(event: any) {
    this.definePaginationData(event);
    this.getManamementTypesList();
  }

  onSearch() {
    this.pagination.reset();
    this.definePaginationData({ page: 0, rows: this.pagination.limit });
    this.managementTypesFilters = { ...this.managementTypesFilters, page: this.pagination.page, limit: this.pagination.limit };
    this.getManamementTypesList();
  }

  onFilterReset() {
    this.pagination.reset();
    this.definePaginationData({ page: 0, rows: this.pagination.limit });
    this.managementTypesFilters = new ManagementTypesFiltersModel();
    this.managementTypesFilters = { ...this.pagination.getAsObject() };
    this.getManamementTypesList();
  }

  // METHODS
  // ==========================
  private getManamementTypesList() {
    this._managementTypeService.list(this.managementTypesFilters).subscribe(response => {
      this.managementTypes = response.result;
    });
  }

  private definePaginationData(event: any) {
    this.first = event.page === 0 ? 0 : event.page * event.rows;
    this.managementTypesFilters.page = event.page + 1;
  }
}
