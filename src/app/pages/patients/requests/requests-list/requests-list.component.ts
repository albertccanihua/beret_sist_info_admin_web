import { Component } from '@angular/core';
import { TreatmentService } from "../../../../services/treatment/treatment.service";
import { TreatmentRequestService } from "../../../../services/treatment/treatment-request.service";
import { IGetTreatmentsApiResponse } from "../../../../interfaces/treatment/get-treatments-api-response.interface";
import { MenuItem, MessageService } from "primeng/api";
import { UserService } from 'src/app/services/user/user.service.service';


@Component({
    selector: 'app-requests-list',
    templateUrl: 'requests-list.component.html',
    styleUrl: './requests-list.component.scss'
})
export class RequestsListComponent {

    first: number = 0;
    menuBreadcrumb: MenuItem[] | undefined;
    home: MenuItem | undefined;

    treatments: IGetTreatmentsApiResponse[] = [];
    documentNumberFilter: string;

    authenticatedUserId: number = 0;

    constructor(
        private _treatmentService: TreatmentService,
        private _treatmentRequestService: TreatmentRequestService,
        private userService: UserService,
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.menuBreadcrumb = [{ label: 'Pacientes' }, { label: 'Consultas' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };

        this.userService.currentUserId.subscribe(id => {
            this.authenticatedUserId = id
        })
    }

    // PAGE EVENTS
    // ==========================

    onSearch() {
        this.getTreatmentsList();
    }

    // METHODS
    // ==========================

    private getTreatmentsList() {
        this._treatmentService.get({
            patient_document_number: this.documentNumberFilter
        }).subscribe(response => {
            this.treatments = response.result;

            if (response.result.length > 0) {
                this._treatmentRequestService.create({
                    user_creator: this.authenticatedUserId,
                    patient: response.result[0].patient.id
                }).subscribe(response => {
                })
            } else {
                this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'El paciente no tiene tratamientos registrados', closable: true });
            }
        });
    }

}
