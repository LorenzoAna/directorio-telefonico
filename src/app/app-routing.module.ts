import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCardComponent } from './features/contacts/contact-card/contact-card.component';
import { SidebarComponent } from './features/contacts/sidebar/sidebar.component';
import { ContactListComponent } from './features/contacts/contact-list/contact-list.component';
import { LoginComponent } from './features/users/login/login.component';
import { RegisterComponent } from './features/users/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: ContactListComponent },
  { path: 'agregar-contacto', component: SidebarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
