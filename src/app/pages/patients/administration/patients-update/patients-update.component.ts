import {Component} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
    IGetManagementTypesApiResponse
} from "../../../../interfaces/management-type/get-management-types-api-response.interface";
import {ManagementTypeService} from "../../../../services/management-type/management-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IApiResponse} from "../../../../interfaces/api-response.interface";
import {DateHelper} from "../../../../helpers/date.helper";
import {PatientService} from "../../../../services/patient/patient.service";

@Component({
    selector: 'app-patients-update',
    templateUrl: './patients-update.component.html',
    styleUrl: './patients-update.component.scss'
})
export class PatientsUpdateComponent {

    menuBreadcrumb: MenuItem[] | undefined;
    home: MenuItem | undefined;
    isFormSubmitted: boolean = false;
    isFormLoading: boolean = false;

    patientId: string;
    updatePatientForm: FormGroup;

    typeDocuments: IGetManagementTypesApiResponse[] = [];
    typeGenders: IGetManagementTypesApiResponse[] = [];
    typeFinancing: IGetManagementTypesApiResponse[] = [];
    typeStatus: any[] = [{name: 'Activo', id: true}, {name: 'Inactivo', id: false}];

    constructor(
        private _patientService: PatientService,
        private _managementTypeService: ManagementTypeService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService
    ) {
        this.updatePatientForm = new FormGroup({
            document_number: new FormControl('', [Validators.required, Validators.minLength(8)]),
            dob: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            paternal_surname: new FormControl('', [Validators.required]),
            maternal_lastname: new FormControl(''),
            email: new FormControl(''),
            phone_number: new FormControl(''),
            status: new FormControl(''),
            type_document: new FormControl('', [Validators.required]),
            type_gender: new FormControl('', [Validators.required]),
            type_financing: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {
        this.menuBreadcrumb = [
            {label: 'Pacientes'},
            {label: 'Administración', routerLink: '/patients/administration'},
            {label: 'Actualizar'}
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
                    console.log(data.result);
                    this.updatePatientForm.setValue({
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
                        type_financing: data.result.type_financing.id
                    })
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

    submitForm() {
        this.isFormSubmitted = true;

        const isValid = this.updatePatientForm.valid;

        if (isValid === true) {
            this.isFormLoading = true;

            try {
                this._patientService.update({
                    id: this.patientId,
                    document_number: this.updatePatientForm.value.document_number,
                    dob: DateHelper.invertDate(this.updatePatientForm.value.dob, '/', '-'),
                    name: this.updatePatientForm.value.name,
                    paternal_surname: this.updatePatientForm.value.paternal_surname,
                    maternal_lastname: this.updatePatientForm.value.maternal_lastname,
                    email: this.updatePatientForm.value.email,
                    phone_number: this.updatePatientForm.value.phone_number,
                    status: this.updatePatientForm.value.status,
                    type_document: this.updatePatientForm.value.type_document,
                    type_gender: this.updatePatientForm.value.type_gender,
                    type_financing: this.updatePatientForm.value.type_financing
                }).subscribe((response) => {
                    if (response.code === 200) {
                        this.messageService.add({severity: 'success', summary: 'Genial', detail: 'El paciente se actualizó correctamente', closable: true});
                        this.isFormLoading = false;
                        this.router.navigateByUrl('/patients/administration');
                    }
                })
            } catch (error) {
                this.isFormLoading = false;
            }
        }
    }
}
