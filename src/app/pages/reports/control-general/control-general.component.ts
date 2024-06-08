import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";
import { DateHelper } from 'src/app/helpers/date.helper';
import { IGetTreatmentAssistanceFollowUpApiResponse } from 'src/app/interfaces/treatment/get-treatment-assistance-follow-up-api-response.interface';
import { IGetTreatmentRequestFollowUpApiResponse } from 'src/app/interfaces/treatment/get-treatment-request-follow-up-api-response.interface';
import { TreatmentAssistancesService } from 'src/app/services/treatment/treatment-assistances.service';
import { TreatmentRequestService } from 'src/app/services/treatment/treatment-request.service';

@Component({
  selector: 'app-control-general',
  templateUrl: './control-general.component.html',
  styleUrl: './control-general.component.scss'
})
export class ControlGeneralComponent {

  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;

  dateFilter: string;

  treatmentFollowUp: any = {};
  treatmentAssistanceFollowUp: IGetTreatmentAssistanceFollowUpApiResponse = { treatments_per_day: 0, treatments_per_month: 0 };
  treatmentRequestFollowUp: IGetTreatmentRequestFollowUpApiResponse = { requests_per_day: 0, requests_per_month: 0 };

  constructor(
    private _treatmentAssistanceService: TreatmentAssistancesService,
    private _treatmentRequestService: TreatmentRequestService
  ) {
  }

  ngOnInit() {
    this.menuBreadcrumb = [{ label: 'Reportes' }, { label: 'Seguimiento' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.dateFilter = DateHelper.getCurrentFormatDate('es');
    console.log(this.dateFilter);
  }

  // PAGE EVENTS
  // ==========================

  onSearch() {
    this.getTreatmentRequestFollowUp();
  }

  // METHODS
  // ==========================

  getTreatmentRequestFollowUp() {
    let dateFilter = '';
    if (typeof this.dateFilter == 'string' && this.dateFilter.split('-').length == 3) {
      dateFilter = DateHelper.invertDate(this.dateFilter, '-', '-');
    } else {
      dateFilter = DateHelper.invertDate(DateHelper.formatDate(this.dateFilter), '-', '-')
    }

    this._treatmentAssistanceService.getFollowUp({ date_care: dateFilter }).subscribe((response) => {
      this.treatmentAssistanceFollowUp = response.result;
      this.treatmentFollowUp = { ...this.treatmentFollowUp, ...this.treatmentAssistanceFollowUp };
    });
    this._treatmentRequestService.getFollowUp({ created_at: dateFilter }).subscribe((response) => {
      this.treatmentRequestFollowUp = response.result;
      this.treatmentFollowUp = { ...this.treatmentFollowUp, ...this.treatmentRequestFollowUp };
    });

  }
}
