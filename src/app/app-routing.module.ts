import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './features/contacts/sidebar/sidebar.component';
import { ContactListComponent } from './features/contacts/contact-list/contact-list.component';
import { LoginComponent } from './features/users/login/login.component';
import { RegisterComponent } from './features/users/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactFormComponent } from './features/contacts/contact-form/contact-form.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts',
    component: ContactListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'new',
        component: ContactFormComponent,
        data: { mode: 'create' },
      },
      {
        path: 'edit/:id',
        component: ContactFormComponent,
        data: { mode: 'edit' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
