import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Pagination } from 'src/app/classes/pagination.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { IListPacketsApiResponse } from 'src/app/interfaces/packet/list-packets-api-response.interface';
import { IPacketsApiFilters } from 'src/app/interfaces/packet/packets-api-filters.interface';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { PacketsFiltersModel } from 'src/app/models/packets-filters.model';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { PacketService } from 'src/app/services/packet/packet.service';

@Component({
  selector: 'app-packets-list',
  templateUrl: './packets-list.component.html',
  styleUrl: './packets-list.component.scss'
})
export class PacketsListComponent implements OnInit {

  first: number = 0;
  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  pagination: Pagination = new Pagination();

  packets: IPaginateEntityApiResponse<IListPacketsApiResponse[]> = { data: [], page: 1, total_data: 0, total_page: 0 };
  packetFilters: IPacketsApiFilters;

  typeStatus: any[] = [{ name: 'Activo', id: 1 }, { name: 'Inactivo', id: 0 }];

  constructor(
    private _packetsService: PacketService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
  ) {
    this.packetFilters = new PacketsFiltersModel();
    this.packetFilters = { ...this.pagination.getAsObject() };
  }

  ngOnInit() {
    this.menuBreadcrumb = [{ label: 'Configuración' }, { label: 'Paquetes' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.getPacketList();
  }

  // PAGE EVENTS
  // ==========================
  onPageChange(event: any) {
    this.definePaginationData(event);
    this.getPacketList();
  }

  onConfirmDeletePacket(event: Event, id: string) {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'El paquete se eliminará permanentemente, desea continuar?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => this.deletePacket(id)
    });
  }

  onSearch() {
    this.pagination.reset();
    this.definePaginationData({ page: 0, rows: this.pagination.limit });
    this.packetFilters = { ...this.packetFilters, page: this.pagination.page, limit: this.pagination.limit };
    this.getPacketList();
  }

  onFilterReset() {
    this.pagination.reset();
    this.definePaginationData({ page: 0, rows: this.pagination.limit });
    this.packetFilters = new PacketsFiltersModel();
    this.packetFilters = { ...this.pagination.getAsObject() };
    this.getPacketList();
  }

  // METHODS
  // ==========================

  private getPacketList() {
    this._packetsService.list(this.packetFilters).subscribe(response => {
      this.packets = response.result;
    });
  }

  private deletePacket(id: string) {
    this._packetsService.delete(id).subscribe((response) => {
      if (response.code === 200) {
        this._messageService.add({
          severity: 'success',
          summary: 'Genial!',
          detail: 'El paquete se eliminó correctamente',
          life: 3000
        });
        this.getPacketList();
      }
    });
  }

  private definePaginationData(event: any) {
    this.first = event.page === 0 ? 0 : event.page * event.rows;
    this.packetFilters.page = event.page + 1;
  }
}
