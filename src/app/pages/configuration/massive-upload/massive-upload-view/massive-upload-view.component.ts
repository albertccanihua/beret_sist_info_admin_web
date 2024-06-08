import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Pagination } from 'src/app/classes/pagination.class';
import { DateHelper } from 'src/app/helpers/date.helper';
import { IGetMassiveUploadsAPIResponse } from 'src/app/interfaces/massive-upload/get-massive-uploads-api-response.interface';
import { IShowMassiveUploadAPIResponse, MassiveUploadItem } from 'src/app/interfaces/massive-upload/show-massive-upload-api-response.interface';
import { MassiveUploadService } from 'src/app/services/massive-upload/massive-upload.service';

@Component({
  selector: 'app-massive-upload-view',
  templateUrl: './massive-upload-view.component.html',
  styleUrl: './massive-upload-view.component.scss'
})
export class MassiveUploadViewComponent {

  visible: boolean = false;

  first: number = 0;
  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  pagination: Pagination = new Pagination();

  isModalOpen = false;
  massiveUploadId: string = '';
  massiveUpload: IShowMassiveUploadAPIResponse | undefined;
  massiveUploadCreatedAt: string = '';

  massiveUploadItem: MassiveUploadItem | undefined;
  objectKeys: string[] = [];
  objectValues: any[] = [];
  status: any[] = [];

  constructor(
    private _massiveUploadService: MassiveUploadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menuBreadcrumb = [{ label: 'Configuración' }, { label: 'Carga de datos' }, { label: 'Ver' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.showMassiveUpload();

    this._massiveUploadService.currentMassiveUploadItem.subscribe(item => {
      this.massiveUploadItem = item;
      this.massiveUploadItem.item = JSON.parse(item.item);
      this.objectKeys = Object.keys(this.massiveUploadItem.item);
      this.objectValues = Object.values(this.massiveUploadItem.item);
      this.status = JSON.parse(this.massiveUploadItem.reason)
    });
  }


  private showMassiveUpload() {
    this.route.paramMap.subscribe(params => {
      this.massiveUploadId = params.get('id')!;
      this._massiveUploadService.show(params.get('id')!).subscribe(response => {
        this.massiveUpload = response.result;
        this.massiveUploadCreatedAt = DateHelper.formatDate(this.massiveUpload.created_at?.toString() ?? '')
      })
    });
  }

  setOpen(item: MassiveUploadItem) {
    console.log(item);
    this.visible = true;
    this._massiveUploadService.newMassiveUploadItem(item)
  }

  setClose() {
    this.visible = false;
  }

}
