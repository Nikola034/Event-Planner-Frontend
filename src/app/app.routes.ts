import { Routes } from '@angular/router';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { SearchPageComponent } from './layout/search-page/search-page-component/search-page.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { ServiceCrudComponent } from './merchandise/service/service-crud/service-crud.component';
import { RegisterEoFormComponent } from './user/register/register-eo-form/register-eo-form.component';
import { RegisterSpFormComponent } from './user/register/register-sp-form/register-sp-form.component';
import { EditAuFormComponent } from './user/edit-profile/edit-au-form/edit-au-form.component';
import { EditEoFormComponent } from './user/edit-profile/edit-eo-form/edit-eo-form.component';
import { EditSpFormComponent } from './user/edit-profile/edit-sp-form/edit-sp-form.component';
import { ChangePasswordComponent } from './user/edit-profile/change-password/change-password.component';
import { FastRegisterComponent } from './user/register/fast-register/fast-register.component';
import { MyEventsComponent } from './event/my-events/my-events.component';
import { EventTypesComponent } from './event-type/event-types/event-types.component';
import { CreateEventFormComponent } from './event/create-event-form/create-event-form.component';
import { EditEventFormComponent } from './event/edit-event-form/edit-event-form.component';
import { AgendaComponent } from './event/agenda/agenda-component/agenda.component';
import { CategoryCrudComponent } from './merchandise/category/category-crud/category-crud.component';
import { ServiceDetailsComponent } from './merchandise/service/service-details/service-details.component';
import { FollowedEventsComponent } from './event/followed-events/followed-events.component';
import { ProdcutDetailsComponent } from './merchandise/product/product-details/prodcut-details.component';
import { MessagingPageComponent } from './shared/messaging/messaging-page/messaging-page.component';
import { AdminUserReportsComponent } from './user/admin-user-reports/admin-user-reports/admin-user-reports.component';
import { ProductsCrudComponent } from './merchandise/product/products-crud/products-crud.component';
import { UpdateProductComponent } from './merchandise/product/update-product/update-product.component';
import { CreateProductComponent } from './merchandise/product/create-product/create-product.component';
import { AdminReviewsComponent } from './review/admin-reviews/admin-reviews.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { FavoriteEventsComponent } from './event/favorite-events/favorite-events.component';
import { FavoriteMerchandiseComponent } from './merchandise/merchandise/favorite-merchandise/favorite-merchandise.component';
import { EditActivityFormComponent } from './event/agenda/edit-activity-form/edit-activity-form.component';
import { CreateActivityFormComponent } from './event/agenda/create-activity-form/create-activity-form.component';
import { BudgetComponent } from './event/budget/budget-component/budget.component';
import { PriceListComponent } from './merchandise/price-list/price-list-component/price-list.component';
import { AuthGuard } from './infrastructure/auth/auth-guard';
import { EoGuard } from './infrastructure/auth/eo-guard';
import { SpGuard } from './infrastructure/auth/sp-guard';
import { AdminGuard } from './infrastructure/auth/admin-guard';
import { AuGuard } from './infrastructure/auth/au-guard';
import { GuestGuard } from './infrastructure/auth/guest-guard';


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
                component: ServiceCrudComponent,
                canActivate: [AuthGuard, SpGuard]
            },
            {
                path: 'my_products',
                data:{
                    breadcrumb:'My products'
                },
                component: ProductsCrudComponent,
                canActivate: [AuthGuard, SpGuard]
            },
            {
                path: 'edit-product/:id',
                data:{
                    breadcrumb: null
                },
                component: UpdateProductComponent,
                canActivate: [AuthGuard, SpGuard]
            },
            {
                path: 'create-product',
                data:{
                    breadcrumb: null
                },
                component: CreateProductComponent,
                canActivate: [AuthGuard, SpGuard]
            },
            {
                path: 'my_events',
                data:{
                    breadcrumb:'My events'
                },
                component: MyEventsComponent,
                canActivate: [AuthGuard, EoGuard]
            },
            {
                path: 'event-types',
                data:{
                    breadcrumb:'Event Types'
                },
                component: EventTypesComponent,
                canActivate: [AuthGuard, AdminGuard]
            },
            {
                path: 'create-event',
                data:{
                    breadcrumb: null
                },
                component: CreateEventFormComponent,
                canActivate: [AuthGuard, EoGuard]
            },
            {
                path: 'edit-event/:id',
                data:{
                    breadcrumb: null
                },
                component: EditEventFormComponent,
                canActivate: [AuthGuard, EoGuard]
            },
            {
                path: 'event-details/:id',
                data:{
                    breadcrumb: null
                },
                component: EventDetailsComponent
            },
            {
                path: 'category',
                data: {
                    breadcrumb: 'Categories'
                },
                component: CategoryCrudComponent,
                canActivate: [AuthGuard, AdminGuard]
            }
            ,
            {
                path: 'service/:id',
                data: {
                    breadcrumb: 'Service'
                },
                component: ServiceDetailsComponent
            },
            {
                path: 'product/:productId/:eventId',
                data: {
                    breadcrumb: 'Product'
                },
                component: ProdcutDetailsComponent
            },
            {
                path: 'followed-events',
                data: {
                    breadcrumb: 'Followed Events'
                },
                component: FollowedEventsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'messenger/:serviceProviderId',
                data: {
                    breadcrumb: 'Messenger'
                },
                component: MessagingPageComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin-user-reports',
                data: {
                    breadcrumb: 'User Reports'
                },
                component: AdminUserReportsComponent,
                canActivate: [AuthGuard, AdminGuard]
            },
            {
                path: 'admin-reviews',
                data: {
                    breadcrumb: 'Reviews'
                },
                component: AdminReviewsComponent,
                canActivate: [AuthGuard, AdminGuard]
            },
            {
                path: 'favorite-events',
                data: {
                    breadcrumb: 'Favorite Events'
                },
                component: FavoriteEventsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'favorite-merchandise',
                data: {
                    breadcrumb: 'Favorite Services/Products'
                },
                component: FavoriteMerchandiseComponent,
                canActivate: [AuthGuard]
            } ,
            {
                path: 'agenda/:id',
                data: {
                    breadcrumb: 'Agenda'
                },
                component: AgendaComponent
            },
            {
                path: 'agenda/:id/add',
                data: {
                    breadcrumb: 'Agenda'
                },
                component: CreateActivityFormComponent,
                canActivate: [AuthGuard, EoGuard]
            },
            {
                path: 'agenda/edit/:activityId',
                data: {
                    breadcrumb: 'Agenda'
                },
                component: EditActivityFormComponent,
                canActivate: [AuthGuard, EoGuard]
            },
            {
                path: 'budget/:eventId',
                data: {
                    breadcrumb: "Budget"
                },
                component: BudgetComponent,
                canActivate: [AuthGuard, EoGuard]
            },
            {
                path: 'price-list',
                data: {
                    breadcrumb: "Price List"
                },
                component: PriceListComponent,
                canActivate: [AuthGuard, SpGuard]
            }
        ]
    },
    { path: '', component: LoginFormComponent},
    { path: 'change-password/:id', component: ChangePasswordComponent, canActivate: [AuthGuard]},
    { path: 'register-au', component: FastRegisterComponent},
    { path: 'register-eo', component: RegisterEoFormComponent},
    { path: 'register-sp', component: RegisterSpFormComponent},
    { path: 'edit-au/:id', component: EditAuFormComponent, canActivate: [AuthGuard, AuGuard]},
    { path: 'edit-eo/:id', component: EditEoFormComponent, canActivate: [AuthGuard, EoGuard]},
    { path: 'edit-sp/:id', component: EditSpFormComponent, canActivate: [AuthGuard, SpGuard]},

];
