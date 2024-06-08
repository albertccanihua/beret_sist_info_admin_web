import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";
import { DateHelper } from 'src/app/helpers/date.helper';
import { IGetTreatmentRequestFollowUpApiResponse } from 'src/app/interfaces/treatment/get-treatment-request-follow-up-api-response.interface';
import { TreatmentRequestService } from 'src/app/services/treatment/treatment-request.service';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrl: './follow-up.component.scss'
})
export class FollowUpComponent {

  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;

  dateFilter: string;

  treatmentFollowUp: IGetTreatmentRequestFollowUpApiResponse = { requests_per_day: 0, requests_per_month: 0 };

  constructor(
    private _treatmentRequestService: TreatmentRequestService,
  ) {
  }

  ngOnInit() {
    this.menuBreadcrumb = [{ label: 'Reportes' }, { label: 'Seguimiento' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.dateFilter = DateHelper.getCurrentFormatDate('es');
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

    this._treatmentRequestService.getFollowUp({ created_at: dateFilter }).subscribe((response) => {
      this.treatmentFollowUp = response.result;
    });
  }
}
