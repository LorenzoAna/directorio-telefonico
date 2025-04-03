import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './features/contacts/contact-list/contact-list.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactFormComponent } from './features/contacts/contact-form/contact-form.component';
import { UsersListComponent } from './features/admin/users-list/users-list.component';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'contacts',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContactListComponent,
      },
      {
        path: 'new',
        component: ContactFormComponent,
        data: { mode: 'create' },
      },
      {
        path: 'edit/:idContact',
        component: ContactFormComponent,
        data: { mode: 'edit' },
      },
    ],
  },
  {
    path: 'users',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: UsersListComponent,
      },
      {
        path: ':id/contacts',
        children: [
          {
            path: '',
            component: ContactListComponent,
          },
          {
            path: 'new',
            component: ContactFormComponent,
            data: { mode: 'create' },
          },
          {
            path: 'edit/:idContact',
            component: ContactFormComponent,
            data: { mode: 'edit' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
