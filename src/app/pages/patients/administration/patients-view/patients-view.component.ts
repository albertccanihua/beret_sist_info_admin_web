import {Component} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {
    IGetManagementTypesApiResponse
} from "../../../../interfaces/management-type/get-management-types-api-response.interface";
import {ManagementTypeService} from "../../../../services/management-type/management-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IApiResponse} from "../../../../interfaces/api-response.interface";
import {DateHelper} from "../../../../helpers/date.helper";
import {IShowPatientApiResponse} from "../../../../interfaces/patient/show-patient-api-response.interface";
import {UpdatePatientModel} from "../../../../models/update-patient.model";
import {PatientService} from "../../../../services/patient/patient.service";

@Component({
    selector: 'app-patients-view',
    templateUrl: './patients-view.component.html',
    styleUrl: './patients-view.component.scss'
})
export class PatientsViewComponent {

    menuBreadcrumb: MenuItem[] | undefined;
    home: MenuItem | undefined;
    isFormSubmitted: boolean = false;
    isFormLoading: boolean = false;

    patientId: string;
    patient: IShowPatientApiResponse | undefined;
    showUserForm: UpdatePatientModel;

    typeDocuments: IGetManagementTypesApiResponse[] = [];
    typeGenders: IGetManagementTypesApiResponse[] = [];
    typeFinancing: IGetManagementTypesApiResponse[] = [];

    constructor(
        private _patientService: PatientService,
        private _managementTypeService: ManagementTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService
    ) {
        this.showUserForm = new UpdatePatientModel();
    }

    ngOnInit() {
        this.menuBreadcrumb = [
            {label: 'Pacientes'},
            {label: 'Administración', routerLink: '/patients/administration'},
            {label: 'Ver detalle'}
        ];
        this.home = {icon: 'pi pi-home', routerLink: '/'};

        this.getManagementTypes();
        this.showPatient();
    }

    private showPatient() {
        this.route.paramMap.subscribe(params => {
            this.patientId = params.get('id')!;
            this._patientService.show(params.get('id')!).subscribe((data) => {
                if (data.code == 200) {
                    this.patient = data.result;
                    this.patient.dob = DateHelper.invertDate(this.patient.dob, '-', '/');
                    this.showUserForm = this.patient as UpdatePatientModel;
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
        this._managementTypeService.get({type: 'type_financing', status: 1}).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeFinancing = data.result;
        });
    }
}
