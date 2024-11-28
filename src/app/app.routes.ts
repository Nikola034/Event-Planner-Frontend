import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ServiceCrudComponent } from './components/service-crud/service-crud.component';
import { RegisterEoFormComponent } from './components/register-eo-form/register-eo-form.component';
import { RegisterSpFormComponent } from './components/register-sp-form/register-sp-form.component';
import { EditAuFormComponent } from './components/edit-au-form/edit-au-form.component';
import { EditEoFormComponent } from './components/edit-eo-form/edit-eo-form.component';
import { EditSpFormComponent } from './components/edit-sp-form/edit-sp-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


export const routes: Routes = [
    {
        path: 'home',
        data:{
            breadcrumb:null
        },
        children: [
            {
                path: '',
                data:{
                    breadcrumb:null
                },
                component: HomePageComponent
            },
            {
                path: 'search',
                data:{
                    breadcrumb:'Search'
                },
                component: SearchPageComponent
            },
            {
                path: 'my_services',
                data:{
                    breadcrumb:'My services'
                },
                component: ServiceCrudComponent
            }
        ]
    },
    { path: '', component: EditEoFormComponent},
    { path: 'reset-password', component: ResetPasswordComponent},
    { path: 'register-eo', component: RegisterEoFormComponent},
    { path: 'register-sp', component: RegisterSpFormComponent},
    { path: 'edit-au', component: EditAuFormComponent},
    { path: 'edit-eo', component: EditEoFormComponent},
    { path: 'edit-sp', component: EditSpFormComponent}
];
