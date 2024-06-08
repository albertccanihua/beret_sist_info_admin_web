import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Pagination } from 'src/app/classes/pagination.class';
import { DateHelper } from 'src/app/helpers/date.helper';
import { IGetMassiveUploadsAPIResponse } from 'src/app/interfaces/massive-upload/get-massive-uploads-api-response.interface';
import { MassiveUploadService } from 'src/app/services/massive-upload/massive-upload.service';

@Component({
  selector: 'app-massive-upload-list',
  templateUrl: './massive-upload-list.component.html',
  styleUrl: './massive-upload-list.component.scss'
})
export class MassiveUploadListComponent {

  first: number = 0;
  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  pagination: Pagination = new Pagination();

  massiveUploads: IGetMassiveUploadsAPIResponse[] = [];

  constructor(
    private _massiveUploadService: MassiveUploadService,
  ) { }

  ngOnInit() {
    this.menuBreadcrumb = [{ label: 'Configuración' }, { label: 'Carga de datos' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.getMassiveUploads();
  }

  getMassiveUploads() {
    this._massiveUploadService.get({}).subscribe(response => {
      if (response.code == 200) {
        this.massiveUploads = response.result.map(item => {
          return {
            ...item,
            created_at: DateHelper.formatDate(item.created_at),
          }
        })
      }
    })
  }

}
