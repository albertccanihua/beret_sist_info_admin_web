import { Component, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { DateHelper } from "../../../../helpers/date.helper";
import { TreatmentService } from "../../../../services/treatment/treatment.service";
import {
    IShowTreatmentAPIResponse,
    ITreatmentAssistance
} from "../../../../interfaces/treatment/show-treatment-api-response.interface";
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
    selector: 'app-requests-view',
    templateUrl: './requests-view.component.html',
    styleUrl: './requests-view.component.scss'
})
export class RequestsViewComponent {

    @ViewChild('op') overlayPanel: OverlayPanel;

    menuBreadcrumb: MenuItem[] | undefined;
    home: MenuItem | undefined;

    treatmentId: string;
    treatment: IShowTreatmentAPIResponse | undefined;
    treatmentCreatedAt: string = '';

    constructor(
        private _treatmentService: TreatmentService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.menuBreadcrumb = [
            { label: 'Pacientes' },
            { label: 'Consultas', routerLink: '/patients/administration' },
            { label: 'Ver detalle' }
        ];
        this.home = { icon: 'pi pi-home', routerLink: '/' };

        this.showTreatment();
    }

    private showTreatment() {
        this.route.paramMap.subscribe(params => {
            this.treatmentId = params.get('id')!;
            this._treatmentService.show(params.get('id')!).subscribe(response => {
                this.treatment = response.result;
                this.treatmentCreatedAt = DateHelper.formatDate(this.treatment.created_at?.toString() ?? '');

                if (this.treatment?.treatment_specialities) {
                    for (let x = 0; x < this.treatment.treatment_specialities.length; x++) {
                        let speciality = this.treatment.treatment_specialities[x];
                        const assistances = speciality.treatment_assistances;
                        this.treatment.treatment_specialities[x].treatment_assistances = [];

                        for (let i = 0; i < speciality.sessions; i++) {
                            if (assistances[i] !== undefined) {
                                this.treatment.treatment_specialities[x].treatment_assistances.push(assistances[i]);
                            } else {
                                this.treatment.treatment_specialities[x].treatment_assistances.push({ id: null } as ITreatmentAssistance);
                            }
                        }
                    }
                }
            });
        });
    }

    viewAssistanceDetails(event: any, assistance) {
        this.overlayPanel.toggle(event);
    }
}
