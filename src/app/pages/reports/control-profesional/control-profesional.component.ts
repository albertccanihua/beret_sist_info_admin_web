import { Component } from '@angular/core';
import { MenuItem, MessageService } from "primeng/api";
import { DateHelper } from 'src/app/helpers/date.helper';
import { IGetTreatmentAssistanceFollowUpApiResponse } from 'src/app/interfaces/treatment/get-treatment-assistance-follow-up-api-response.interface';
import { IGetTreatmentRequestFollowUpApiResponse } from 'src/app/interfaces/treatment/get-treatment-request-follow-up-api-response.interface';
import { IGetUsersApiResponse } from 'src/app/interfaces/user/get-users-api-response.interface';
import { TreatmentAssistancesService } from 'src/app/services/treatment/treatment-assistances.service';
import { TreatmentRequestService } from 'src/app/services/treatment/treatment-request.service';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
  selector: 'app-control-profesional',
  templateUrl: './control-profesional.component.html',
  styleUrl: './control-profesional.component.scss'
})
export class ControlProfesionalComponent {

  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;

  dateFilter: string;
  userFilter: string;

  treatmentFollowUp: IGetTreatmentAssistanceFollowUpApiResponse = { treatments_per_day: 0, treatments_per_month: 0 };
  users: IGetUsersApiResponse[] = [];

  constructor(
    private _userService: UserService,
    private _treatmentAssistanceService: TreatmentAssistancesService,
    private _messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.menuBreadcrumb = [{ label: 'Reportes' }, { label: 'Seguimiento' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.dateFilter = DateHelper.getCurrentFormatDate('es');
    this.getUsers();
  }

  // PAGE EVENTS
  // ==========================

  onSearch() {
    this.getTreatmentAssistanceFollowUp();
  }

  // METHODS
  // ==========================

  private getUsers() {
    this._userService.get({}).subscribe((response) => {
      this.users = response.result.map((user) => { return { ...user, fullname: user.name + ' ' + user.paternal_surname } });
    })
  }

  getTreatmentAssistanceFollowUp() {

    if (this.userFilter === '') {
      this._messageService.add({
        severity: 'danger',
        summary: 'Error!',
        detail: 'Debe seleccionar un profesional',
        life: 3000
      });
      return;
    }

    let dateFilter = '';
    if (typeof this.dateFilter == 'string' && this.dateFilter.split('-').length == 3) {
      dateFilter = DateHelper.invertDate(this.dateFilter, '-', '-');
    } else {
      dateFilter = DateHelper.invertDate(DateHelper.formatDate(this.dateFilter), '-', '-')
    }

    this._treatmentAssistanceService.getFollowUp({
      date_care: dateFilter,
      profesional: this.userFilter
    }).subscribe((response) => {
      this.treatmentFollowUp = response.result;
      this.treatmentFollowUp.treatments_per_day = this.divideInteger(response.result.treatments_per_day);

      this._messageService.add({
        severity: 'success',
        summary: 'Genial!',
        detail: 'Reporte cargado correctamente...',
        life: 3000
      });
    });
  }

  private divideInteger(number: number) {
    if (number == 0) return 0;
    if (number == 1) return 1;


    let half = number / 2;
    return Math.ceil(half);
  }
}
