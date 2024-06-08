import { Component } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { Pagination } from "../../../../classes/pagination.class";
import { IPaginateEntityApiResponse } from "../../../../interfaces/paginate-entity-api-response.interface";
import {
    IGetManagementTypesApiResponse
} from "../../../../interfaces/management-type/get-management-types-api-response.interface";
import { ManagementTypeService } from "../../../../services/management-type/management-type.service";
import { IApiResponse } from "../../../../interfaces/api-response.interface";
import { PatientFiltersModel } from "../../../../models/patients-filters.model";
import { IListPatientsApiResponse } from "../../../../interfaces/patient/list-patients-api-response.interface";
import { IPatientsApiFilters } from "../../../../interfaces/patient/patients-api-filters.interface";
import { PatientService } from "../../../../services/patient/patient.service";

@Component({
    selector: 'app-patients-list',
    templateUrl: './patients-list.component.html',
    styleUrl: './patients-list.component.scss'
})
export class PatientsListComponent {

    first: number = 0;
    menuBreadcrumb: MenuItem[] | undefined;
    home: MenuItem | undefined;
    pagination: Pagination = new Pagination();

    patients: IPaginateEntityApiResponse<IListPatientsApiResponse[]> = { data: [], page: 1, total_data: 0, total_page: 0 };
    patientFilters: IPatientsApiFilters;

    typeDocuments: IGetManagementTypesApiResponse[] = [];
    typeFinancing: IGetManagementTypesApiResponse[] = [];

    constructor(
        private _patientService: PatientService,
        private _managementTypeService: ManagementTypeService,
        private _confirmationService: ConfirmationService,
        private _messageService: MessageService
    ) {
        this.patientFilters = new PatientFiltersModel();
        this.patientFilters = { ...this.pagination.getAsObject() };
    }

    ngOnInit() {
        this.menuBreadcrumb = [{ label: 'Pacientes' }, { label: 'Administración' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };

        this.getPatientList();
        this.getManagementTypes();
    }

    // PAGE EVENTS
    // ==========================
    onPageChange(event: any) {
        this.definePaginationData(event);
        this.getPatientList();
    }

    onConfirmDeletePatient(event: Event, id: string) {
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'El paciente se eliminará permanentemente, desea continuar?',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-sm',
            acceptLabel: 'Confirmar',
            rejectLabel: 'Cancelar',
            accept: () => this.deletePatient(id)
        });
    }

    onSearch() {
        this.pagination.reset();
        this.definePaginationData({ page: 0, rows: this.pagination.limit });
        this.patientFilters = { ...this.patientFilters, page: this.pagination.page, limit: this.pagination.limit };
        this.getPatientList();
    }

    onFilterReset() {
        this.pagination.reset();
        this.definePaginationData({ page: 0, rows: this.pagination.limit });
        this.patientFilters = new PatientFiltersModel();
        this.patientFilters = { ...this.pagination.getAsObject() };
        this.getPatientList();
    }

    // METHODS
    // ==========================

    private getManagementTypes() {
        this._managementTypeService.get({ type: 'type_document', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeDocuments = data.result;
        });
        this._managementTypeService.get({ type: 'type_financing', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeFinancing = data.result;
        });
    }

    private getPatientList() {
        this._patientService.list(this.patientFilters).subscribe(response => {
            this.patients = response.result;
        });
    }

    private deletePatient(id: string) {
        this._patientService.delete(id).subscribe((response) => {
            if (response.code === 200) {
                this._messageService.add({
                    severity: 'success',
                    summary: 'Genial!',
                    detail: 'El paciente se eliminó correctamente',
                    life: 3000
                });
                this.getPatientList();
            }
        });
    }

    private definePaginationData(event: any) {
        this.first = event.page === 0 ? 0 : event.page * event.rows;
        this.patientFilters.page = event.page + 1;
    }

}
