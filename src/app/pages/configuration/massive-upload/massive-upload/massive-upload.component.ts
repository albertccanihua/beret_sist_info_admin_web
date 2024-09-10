import { Component, OnInit } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { IDataToUpload } from 'src/app/interfaces/upload-data/data-to-upload.interface';
import { MassiveUploadService } from 'src/app/services/massive-upload/massive-upload.service';
import { UserService } from 'src/app/services/user/user.service.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-massive-upload',
  templateUrl: './massive-upload.component.html',
  styleUrl: './massive-upload.component.scss'
})
export class MassiveUploadComponent {

  menuBreadcrumb: MenuItem[] | undefined;
  messages: Message[] | undefined;
  home: MenuItem | undefined;

  first: number = 0;
  isLoadingData: boolean = false;
  isFileSelected: boolean = false;
  dataToUpload: IDataToUpload[] = [];
  dataToUploadForShowing: IDataToUpload[] = [];
  fileToUpload: any;

  authenticatedUserId: number = 0;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private _massiveUploadService: MassiveUploadService
  ) { }

  ngOnInit(): void {
    this.menuBreadcrumb = [{ label: 'Configuración' }, { label: 'Carga de datos' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.messages = [{ severity: 'info', detail: 'Los datos se están cargando en la base de datos, espere un momento por favor...' }];

    this.userService.currentUserId.subscribe(id => {
      this.authenticatedUserId = id
    })
  }

  onPickFile(event: any) {
    const file = event.currentFiles[0];
    this.fileToUpload = file;
    let fr = new FileReader();

    fr.readAsArrayBuffer(file);
    fr.onload = () => {
      let data = fr.result;
      let workbook = xlsx.read(data, { type: 'array' });
      const sheetname = workbook.SheetNames[0];
      const sheet1 = workbook.Sheets[sheetname];
      const parsedData = xlsx.utils.sheet_to_json(sheet1, { raw: true });

      this.dataToUpload = parsedData.map((item: any, index: number) => {
        return { id: index + 1, ...item };
      });

      this.dataToUploadForShowing = this.dataToUpload.slice(0, 100);
      this.isFileSelected = true;
    }
  }

  onProgress(event: any) {
  }

  onPageChange(event: any) {
    this.dataToUploadForShowing = this.dataToUpload.slice(event.first, event.first + 100);
  }

  onUploadData() {

    this._massiveUploadService.get({ filename: this.fileToUpload.name }).subscribe(response => {
      if (response.result.length > 0) {
        this.messageService.add({ severity: 'error', summary: 'Correcto', detail: 'Ya se ha realizado una importación con el archivo: ' + this.fileToUpload.name?.toString(), closable: true });
      } else {
        this.isLoadingData = true;

        this._massiveUploadService.send({
          filename: 'modelo_sist_importacion.xlsx',
          user_creator: this.authenticatedUserId,
          items: this.dataToUpload
        }).subscribe({
          next: (response) => {
            if (response.code === 201) {
              this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'La base de datos se cargó correctamente', closable: true });
            }
          },
          error: (error) => {
            this.isLoadingData = false
          },
          complete: () => {
            location.reload();
          }
        })
      }
    })
  }

}
