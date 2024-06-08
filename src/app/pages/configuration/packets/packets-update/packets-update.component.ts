import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { ICheckbox } from 'src/app/interfaces/checkbox.interface';
import { IPacket } from 'src/app/interfaces/packet/packet.interface';
import { IShowPacketApiResponse } from 'src/app/interfaces/packet/show-packet-api-response.interface';
import { IGetSpecialitiesApiResponse } from 'src/app/interfaces/speciality/get-specialities-api-response.interface';
import { CreateManyPacketSpecialityModel } from 'src/app/models/create-many-packet-speciality.model';
import { UpdatePacketModel } from 'src/app/models/update-packet.model';
import { PacketService } from 'src/app/services/packet/packet.service';
import { SpecialityService } from 'src/app/services/speciality/speciality.service';
import { UserService } from 'src/app/services/user/user.service.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-packets-update',
  templateUrl: './packets-update.component.html',
  styleUrl: './packets-update.component.scss'
})
export class PacketsUpdateComponent {

  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  isFormSubmitted: boolean = false;
  isFormLoading: boolean = false;

  packetId: string = '';
  packet: IShowPacketApiResponse | undefined;
  updatePacketForm: FormGroup;

  specialities: ICheckbox[] = [];
  specialitiesSelected: ICheckbox[] = [];
  packetToUpdate: UpdatePacketModel;
  typeStatus: any[] = [{ name: 'Activo', id: true }, { name: 'Inactivo', id: false }];

  visibleSelectSpecialitiesModal: boolean = false;

  authenticatedUserId: number = 0;

  constructor(
    private _packetService: PacketService,
    private _specialityService: SpecialityService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.packetToUpdate = new UpdatePacketModel();
    this.updatePacketForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      relational_codes: new FormControl('', [Validators.required]),
      status: new FormControl('')
    }, { validators: confirmPasswordValidator });
  }

  ngOnInit() {
    this.menuBreadcrumb = [
      { label: 'Configuración' },
      { label: 'Paquetes', routerLink: '/configuration/packets' },
      { label: 'Registrar' }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.showPacket();
    this.getSpecialities();

    this.userService.currentUserId.subscribe(id => {
      this.authenticatedUserId = id
    })
  }

  private showPacket() {
    this.route.paramMap.subscribe(params => {
      this.packetId = params.get('id')!;
      this._packetService.show(params.get('id')!).subscribe((data: IApiResponse<IShowPacketApiResponse>) => {
        this.packet = data.result;
        this.updatePacketForm.setValue({
          name: this.packet.name,
          code: this.packet.code,
          description: this.packet.description,
          relational_codes: this.packet.relational_codes,
          status: this.packet.status
        });

        this.specialitiesSelected = this.packet.packet_specialities.map((item) => {
          return {
            value: item.speciality.id,
            amount: item.sessions,
            text: item.speciality.name,
            checked: true
          }
        });

      })
    })
  }

  getSpecialities() {
    this._specialityService.get({ status: 1 }).subscribe((data: IApiResponse<IGetSpecialitiesApiResponse[]>) => {
      this.specialities = data.result.map((item: IGetSpecialitiesApiResponse) => {
        let selectedItem = this.specialitiesSelected.find((sItem) => sItem.value === item.id)
        if (selectedItem) {
          return {
            value: item.id,
            amount: selectedItem.amount,
            text: item.name + ' (' + item.code + ')',
            checked: true
          }
        } else {
          return {
            value: item.id,
            amount: 1,
            text: item.name + ' (' + item.code + ')',
            checked: false
          }
        }
      });
    })
  }

  selectSpecialities() {
    this.specialitiesSelected = this.specialities.filter((item) => item.checked === true);
    this.visibleSelectSpecialitiesModal = false;
  }

  incrementSession(speciality: ICheckbox) {
    let item = this.specialitiesSelected.find(i => i.value === speciality.value);

    if (item) {
      item.amount++;
    }

  }

  decreaseSession(speciality: ICheckbox) {
    let item = this.specialitiesSelected.find(i => i.value === speciality.value);

    if (item && item.amount > 1) {
      item.amount--;
    }
  }

  submitForm() {

    this.isFormSubmitted = true;

    const isValid = this.updatePacketForm.valid;

    if (this.specialitiesSelected.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Débe seleccionar especialidades!', closable: true });
      return;
    }

    this.packetToUpdate.specialities = this.specialitiesSelected.map((item) => {
      return {
        speciality: item.value,
        sessions: item.amount
      } as CreateManyPacketSpecialityModel;
    })

    if (isValid === true) {
      this.isFormLoading = true;

      try {
        this._packetService.update({
          id: this.packetId,
          user_creator: this.authenticatedUserId,
          name: this.updatePacketForm.value.name,
          description: this.updatePacketForm.value.description,
          relational_codes: this.updatePacketForm.value.relational_codes,
          status: this.updatePacketForm.value.status,
          specialities: this.packetToUpdate.specialities,
        }).subscribe((response: IApiResponse<IPacket>) => {
          if (response.code === 200) {
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'El paquete se actualizó correctamente', closable: true });
            this.isFormLoading = false;
            this.router.navigateByUrl('/configuration/packets');
          };
        })
      } catch (error) {
        this.isFormLoading = false;
      }
    }
  }
}
