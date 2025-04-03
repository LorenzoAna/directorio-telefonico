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
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'users',
    canActivateChild: [AdminGuard],
    children: [
      {
        path: ':id/contacts',
        component: ContactListComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
