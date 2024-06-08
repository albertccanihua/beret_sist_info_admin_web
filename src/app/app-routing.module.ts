import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersCreateComponent } from './pages/users/users-create/users-create.component';
import { UsersUpdateComponent } from './pages/users/users-update/users-update.component';
import { UsersViewComponent } from './pages/users/users-view/users-view.component';
import { PatientsCreateComponent } from './pages/patients/administration/patients-create/patients-create.component';
import { PatientsUpdateComponent } from './pages/patients/administration/patients-update/patients-update.component';
import { PatientsViewComponent } from './pages/patients/administration/patients-view/patients-view.component';
import { PatientsListComponent } from './pages/patients/administration/patients-list/patients-list.component';
import { RequestsListComponent } from "./pages/patients/requests/requests-list/requests-list.component";
import { RequestsViewComponent } from "./pages/patients/requests/requests-view/requests-view.component";
import { UploadDataComponent } from './pages/configuration/upload-data/upload-data.component';
import { ManagementTypesListComponent } from './pages/configuration/management-types/management-types-list/management-types-list.component';
import { ManagementTypesCreateComponent } from './pages/configuration/management-types/management-types-create/management-types-create.component';
import { ManagementTypesUpdateComponent } from './pages/configuration/management-types/management-types-update/management-types-update.component';
import { PacketsListComponent } from './pages/configuration/packets/packets-list/packets-list.component';
import { PacketsCreateComponent } from './pages/configuration/packets/packets-create/packets-create.component';
import { PacketsUpdateComponent } from './pages/configuration/packets/packets-update/packets-update.component';
import { SpecialitiesListComponent } from './pages/configuration/specialities/specialities-list/specialities-list.component';
import { SpecialitiesCreateComponent } from './pages/configuration/specialities/specialities-create/specialities-create.component';
import { SpecialitiesUpdateComponent } from './pages/configuration/specialities/specialities-update/specialities-update.component';
import { FollowUpComponent } from './pages/reports/follow-up/follow-up.component';
import { ControlGeneralComponent } from './pages/reports/control-general/control-general.component';
import { ControlProfesionalComponent } from './pages/reports/control-profesional/control-profesional.component';
import { authGuard } from './auth.guard';
import { MassiveUploadComponent } from './pages/configuration/massive-upload/massive-upload/massive-upload.component';
import { MassiveUploadListComponent } from './pages/configuration/massive-upload/massive-upload-list/massive-upload-list.component';
import { MassiveUploadViewComponent } from './pages/configuration/massive-upload/massive-upload-view/massive-upload-view.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    {
                        path: '',
                        canActivate: [authGuard],
                        component: RequestsListComponent
                    },
                    {
                        path: 'users/administration',
                        canActivate: [authGuard],
                        component: UsersListComponent
                    },
                    {
                        path: 'users/administration/create',
                        canActivate: [authGuard],
                        component: UsersCreateComponent
                    },
                    {
                        path: 'users/administration/update/:id',
                        canActivate: [authGuard],
                        component: UsersUpdateComponent
                    },
                    {
                        path: 'users/administration/view/:id',
                        canActivate: [authGuard],
                        component: UsersViewComponent
                    },
                    {
                        path: 'patients/administration',
                        canActivate: [authGuard],
                        component: PatientsListComponent
                    },
                    {
                        path: 'patients/administration/create',
                        canActivate: [authGuard],
                        component: PatientsCreateComponent
                    },
                    {
                        path: 'patients/administration/update/:id',
                        canActivate: [authGuard],
                        component: PatientsUpdateComponent
                    },
                    {
                        path: 'patients/administration/view/:id',
                        canActivate: [authGuard],
                        component: PatientsViewComponent
                    },
                    {
                        path: 'patients/requests',
                        canActivate: [authGuard],
                        component: RequestsListComponent
                    },
                    {
                        path: 'patients/requests/view/:id',
                        canActivate: [authGuard],
                        component: RequestsViewComponent
                    },
                    {
                        path: 'reports/follow-up',
                        canActivate: [authGuard],
                        component: FollowUpComponent
                    },
                    {
                        path: 'reports/control-general',
                        canActivate: [authGuard],
                        component: ControlGeneralComponent
                    },
                    {
                        path: 'reports/control-profesional',
                        canActivate: [authGuard],
                        component: ControlProfesionalComponent
                    },
                    {
                        path: 'configuration/massive-upload/list',
                        canActivate: [authGuard],
                        component: MassiveUploadListComponent
                    },
                    {
                        path: 'configuration/massive-upload/view/:id',
                        canActivate: [authGuard],
                        component: MassiveUploadViewComponent
                    },
                    {
                        path: 'configuration/massive-upload',
                        canActivate: [authGuard],
                        component: MassiveUploadComponent
                    },
                    {
                        path: 'configuration/packets',
                        canActivate: [authGuard],
                        component: PacketsListComponent
                    },
                    {
                        path: 'configuration/packets/create',
                        canActivate: [authGuard],
                        component: PacketsCreateComponent
                    },
                    {
                        path: 'configuration/packets/update/:id',
                        canActivate: [authGuard],
                        component: PacketsUpdateComponent
                    },
                    {
                        path: 'configuration/specialities',
                        canActivate: [authGuard],
                        component: SpecialitiesListComponent
                    },
                    {
                        path: 'configuration/specialities/create',
                        canActivate: [authGuard],
                        component: SpecialitiesCreateComponent
                    },
                    {
                        path: 'configuration/specialities/update/:id',
                        canActivate: [authGuard],
                        component: SpecialitiesUpdateComponent
                    },
                    {
                        path: 'configuration/management-types',
                        canActivate: [authGuard],
                        component: ManagementTypesListComponent
                    },
                    {
                        path: 'configuration/management-types/create',
                        canActivate: [authGuard],
                        component: ManagementTypesCreateComponent
                    },
                    {
                        path: 'configuration/management-types/update/:id',
                        canActivate: [authGuard],
                        component: ManagementTypesUpdateComponent
                    },
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
