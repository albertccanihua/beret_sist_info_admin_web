import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from "primeng/api";
import {
    IGetManagementTypesApiResponse
} from "../../../../interfaces/management-type/get-management-types-api-response.interface";
import { ManagementTypeService } from "../../../../services/management-type/management-type.service";
import { Router } from "@angular/router";
import { confirmPasswordValidator } from "../../../../validators/confirm-password.validator";
import { IApiResponse } from "../../../../interfaces/api-response.interface";
import { PatientService } from "../../../../services/patient/patient.service";
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
    selector: 'app-patients-create',
    templateUrl: './patients-create.component.html',
    styleUrl: './patients-create.component.scss'
})
export class PatientsCreateComponent {

    menuBreadcrumb: MenuItem[] | undefined;
    home: MenuItem | undefined;
    isFormSubmitted: boolean = false;
    isFormLoading: boolean = false;

    createPatientForm: FormGroup;

    typeDocuments: IGetManagementTypesApiResponse[] = [];
    typeGenders: IGetManagementTypesApiResponse[] = [];
    typeFinancing: IGetManagementTypesApiResponse[] = [];

    authenticatedUserId: number = 0;

    constructor(
        private _patientService: PatientService,
        private _managementTypeService: ManagementTypeService,
        private userService: UserService,
        private router: Router,
        private messageService: MessageService
    ) {
        this.createPatientForm = new FormGroup({
            document_number: new FormControl('', [Validators.required, Validators.minLength(8)]),
            name: new FormControl('', [Validators.required]),
            paternal_surname: new FormControl('', [Validators.required]),
            maternal_lastname: new FormControl(''),
            dob: new FormControl(''),
            email: new FormControl(''),
            phone_number: new FormControl(''),
            status: new FormControl(true),
            type_document: new FormControl('', [Validators.required]),
            type_gender: new FormControl('', [Validators.required]),
            type_financing: new FormControl('', [Validators.required])
        }, { validators: confirmPasswordValidator });
    }

    ngOnInit() {
        this.menuBreadcrumb = [
            { label: 'Pacientes' },
            { label: 'Administración', routerLink: '/patients/administration' },
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
        this._managementTypeService.get({ type: 'type_financing', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeFinancing = data.result;
        });
    }

    submitForm() {
        this.isFormSubmitted = true;

        const isValid = this.createPatientForm.valid;

        if (isValid === true) {
            this.isFormLoading = true;

            try {
                this._patientService.create({
                    document_number: this.createPatientForm.value.document_number,
                    name: this.createPatientForm.value.name,
                    paternal_surname: this.createPatientForm.value.paternal_surname,
                    maternal_lastname: this.createPatientForm.value.maternal_lastname,
                    dob: this.createPatientForm.value.dob,
                    email: this.createPatientForm.value.email,
                    phone_number: this.createPatientForm.value.phone_number,
                    status: true,
                    type_document: this.createPatientForm.value.type_document,
                    type_gender: this.createPatientForm.value.type_gender,
                    type_financing: this.createPatientForm.value.type_financing,
                    user_creator: this.authenticatedUserId,
                }).subscribe((response) => {
                    if (response.code === 201) {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'El paciente se registró correctamente', closable: true });
                        this.isFormLoading = false;
                        this.router.navigateByUrl('/patients/administration');
                    }
                });
            } catch (error) {
                this.isFormLoading = false;
            }
        }
    }

}
