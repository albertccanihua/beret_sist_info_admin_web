import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { PrimeIcons } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        const role = localStorage.getItem('role');

        if (role === 'Profesional') {
            this.model = [
                {
                    label: 'Pacientes',
                    items: [
                        { label: 'Consultas', icon: PrimeIcons.CHECK_SQUARE, routerLink: ['/patients/requests'] },
                    ]
                }
            ];
        }

        if (role === 'Administrador') {
            this.model = [
                {
                    label: 'Usuarios',
                    items: [
                        { label: 'Administración', icon: 'pi pi-fw pi-users', routerLink: ['/users/administration'] }
                    ]
                },
                {
                    label: 'Pacientes',
                    items: [
                        { label: 'Administración', icon: 'pi pi-fw pi-users', routerLink: ['/patients/administration'] },
                        { label: 'Consultas', icon: PrimeIcons.CHECK_SQUARE, routerLink: ['/patients/requests'] },
                    ]
                },
                {
                    label: 'Reportes',
                    items: [
                        { label: 'Seguimiento', icon: PrimeIcons.CHART_BAR, routerLink: ['/reports/follow-up'] },
                        { label: 'Control - General', icon: PrimeIcons.GLOBE, routerLink: ['/reports/control-general'] },
                        { label: 'Control - Profesional', icon: PrimeIcons.USER, routerLink: ['/reports/control-profesional'] },
                    ]
                },
                {
                    label: 'Configuración',
                    items: [
                        { label: 'Paquetes', icon: PrimeIcons.BOX, routerLink: ['/configuration/packets'] },
                        { label: 'Especialidades', icon: PrimeIcons.FILE, routerLink: ['/configuration/specialities'] },
                        { label: 'Tipos de datos', icon: PrimeIcons.TABLE, routerLink: ['/configuration/management-types'] },
                        { label: 'Carga de datos', icon: PrimeIcons.UPLOAD, routerLink: ['/configuration/massive-upload/list'] },
                    ]
                },
            ];
        }


    }
}
