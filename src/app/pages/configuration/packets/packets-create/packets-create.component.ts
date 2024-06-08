import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { ICheckbox } from 'src/app/interfaces/checkbox.interface';
import { IPacket } from 'src/app/interfaces/packet/packet.interface';
import { IGetSpecialitiesApiResponse } from 'src/app/interfaces/speciality/get-specialities-api-response.interface';
import { CreateManyPacketSpecialityModel } from 'src/app/models/create-many-packet-speciality.model';
import { CreatePacketModel } from 'src/app/models/create-packet.model';
import { PacketService } from 'src/app/services/packet/packet.service';
import { SpecialityService } from 'src/app/services/speciality/speciality.service';
import { UserService } from 'src/app/services/user/user.service.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-packets-create',
  templateUrl: './packets-create.component.html',
  styleUrl: './packets-create.component.scss'
})
export class PacketsCreateComponent {

  menuBreadcrumb: MenuItem[] | undefined;
  home: MenuItem | undefined;
  isFormSubmitted: boolean = false;
  isFormLoading: boolean = false;

  createPacketForm: FormGroup;

  specialities: ICheckbox[] = [];
  specialitiesSelected: ICheckbox[] = [];
  packetToCreate: CreatePacketModel;

  visibleSelectSpecialitiesModal: boolean = false;

  authenticatedUserId: number = 0;

  constructor(
    private _packetService: PacketService,
    private _specialityService: SpecialityService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.packetToCreate = new CreatePacketModel();
    this.createPacketForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      relational_codes: new FormControl('', [Validators.required]),
    }, { validators: confirmPasswordValidator });
  }

  ngOnInit() {
    this.menuBreadcrumb = [
      { label: 'Configuración' },
      { label: 'Paquetes', routerLink: '/configuration/packets' },
      { label: 'Registrar' }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.getSpecialities();

    this.userService.currentUserId.subscribe(id => {
      this.authenticatedUserId = id
    })
  }

  getSpecialities() {
    this._specialityService.get({}).subscribe((data: IApiResponse<IGetSpecialitiesApiResponse[]>) => {
      this.specialities = data.result.map((item: IGetSpecialitiesApiResponse) => {
        return {
          value: item.id,
          amount: 1,
          text: item.name + ' (' + item.code + ')',
          checked: false
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

    const isValid = this.createPacketForm.valid;

    if (this.specialitiesSelected.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Débe seleccionar especialidades!', closable: true });
      return;
    }

    this.packetToCreate.specialities = this.specialitiesSelected.map((item) => {
      return {
        speciality: item.value,
        sessions: item.amount
      } as CreateManyPacketSpecialityModel;
    })

    if (isValid === true) {
      this.isFormLoading = true;

      try {
        this._packetService.create({
          user_creator: this.authenticatedUserId,
          code: this.createPacketForm.value.code,
          name: this.createPacketForm.value.name,
          description: this.createPacketForm.value.description,
          relational_codes: this.createPacketForm.value.relational_codes,
          specialities: this.packetToCreate.specialities,
        }).subscribe((response: IApiResponse<IPacket>) => {
          if (response.code === 201) {
            this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'El paquete se registró correctamente', closable: true });
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
