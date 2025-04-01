import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './features/contacts/sidebar/sidebar.component';
import { ContactListComponent } from './features/contacts/contact-list/contact-list.component';
import { LoginComponent } from './features/users/login/login.component';
import { RegisterComponent } from './features/users/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactFormComponent } from './features/contacts/contact-form/contact-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'contacts',
    component: ContactListComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'contacts/add-new',
  //   component: AddNewContactComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'contacts',
    //  component: ContactListComponent,
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
