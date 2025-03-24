import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCardComponent } from './features/contact-card/contact-card.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { ContactListComponent } from './features/contact-list/contact-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ContactListComponent },
  { path: 'agregar-contacto', component: SidebarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
