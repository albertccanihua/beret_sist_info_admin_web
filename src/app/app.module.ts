import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputDemoRoutingModule } from './demo/components/uikit/input/inputdemo-routing.module';
import { InputTextModule } from "primeng/inputtext";

import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/http-config.interceptor';
import { UsersCreateComponent } from './pages/users/users-create/users-create.component';
import { UsersUpdateComponent } from './pages/users/users-update/users-update.component';
import { UsersViewComponent } from './pages/users/users-view/users-view.component';
import { PatientsCreateComponent } from './pages/patients/administration/patients-create/patients-create.component';
import { PatientsUpdateComponent } from './pages/patients/administration/patients-update/patients-update.component';
import { PatientsListComponent } from './pages/patients/administration/patients-list/patients-list.component';
import { PatientsViewComponent } from './pages/patients/administration/patients-view/patients-view.component';
import { PatientsAssignPacketComponent } from './pages/patients/administration/patients-assign-packet/patients-assign-packet.component';
import { ReactiveTextFieldComponent } from './components/reactive-text-field/reactive-text-field.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { RippleModule } from "primeng/ripple";
import { RequestsListComponent } from "./pages/patients/requests/requests-list/requests-list.component";
import { RequestsViewComponent } from "./pages/patients/requests/requests-view/requests-view.component";
import { UploadDataComponent } from './pages/configuration/upload-data/upload-data.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SpecialitiesListComponent } from './pages/configuration/specialities/specialities-list/specialities-list.component';
import { SpecialitiesCreateComponent } from './pages/configuration/specialities/specialities-create/specialities-create.component';
import { SpecialitiesUpdateComponent } from './pages/configuration/specialities/specialities-update/specialities-update.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ManagementTypesListComponent } from './pages/configuration/management-types/management-types-list/management-types-list.component';
import { ManagementTypesCreateComponent } from './pages/configuration/management-types/management-types-create/management-types-create.component';
import { ManagementTypesUpdateComponent } from './pages/configuration/management-types/management-types-update/management-types-update.component';
import { PacketsListComponent } from './pages/configuration/packets/packets-list/packets-list.component';
import { PacketsCreateComponent } from './pages/configuration/packets/packets-create/packets-create.component';
import { PacketsUpdateComponent } from './pages/configuration/packets/packets-update/packets-update.component';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { FollowUpComponent } from './pages/reports/follow-up/follow-up.component';
import { ControlGeneralComponent } from './pages/reports/control-general/control-general.component';
import { ControlProfesionalComponent } from './pages/reports/control-profesional/control-profesional.component';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessageModule } from 'primeng/message';
import { MassiveUploadListComponent } from './pages/configuration/massive-upload/massive-upload-list/massive-upload-list.component';
import { MassiveUploadViewComponent } from './pages/configuration/massive-upload/massive-upload-view/massive-upload-view.component';
import { MassiveUploadComponent } from './pages/configuration/massive-upload/massive-upload/massive-upload.component';


@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,

        UsersListComponent,
        UsersCreateComponent,
        UsersUpdateComponent,
        UsersViewComponent,
        PatientsListComponent,
        PatientsCreateComponent,
        PatientsUpdateComponent,
        PatientsViewComponent,
        PatientsAssignPacketComponent,
        RequestsListComponent,
        RequestsViewComponent,
        FollowUpComponent,
        ControlGeneralComponent,
        ControlProfesionalComponent,
        PacketsListComponent,
        PacketsCreateComponent,
        PacketsUpdateComponent,
        SpecialitiesListComponent,
        SpecialitiesCreateComponent,
        SpecialitiesUpdateComponent,
        ManagementTypesListComponent,
        ManagementTypesCreateComponent,
        ManagementTypesUpdateComponent,
        UploadDataComponent,
        MassiveUploadListComponent,
        MassiveUploadViewComponent,
        MassiveUploadComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AppLayoutModule,

        BreadcrumbModule,
        ToastModule,
        ToolbarModule,
        ConfirmPopupModule,
        ButtonModule,
        TableModule,
        TagModule,
        PaginatorModule,
        MultiSelectModule,
        DropdownModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputDemoRoutingModule,
        InputTextModule,
        InputTextareaModule,
        InputMaskModule,
        InputNumberModule,
        RippleModule,
        FileUploadModule,
        ScrollTopModule,
        DialogModule,
        CheckboxModule,
        CalendarModule,
        OverlayPanelModule,
        MessageModule,

        ReactiveTextFieldComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MessageService, ConfirmationService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
