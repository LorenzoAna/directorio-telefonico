import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactCardComponent } from './features/contacts/contact-card/contact-card.component';
import { ContactListComponent } from './features/contacts/contact-list/contact-list.component';
import { SidebarComponent } from './features/contacts/sidebar/sidebar.component';
import { ReusableSelectComponent } from './shared/components/reusable-select/reusable-select.component';
import { RegisterComponent } from './features/users/register/register.component';
import { LoginComponent } from './features/users/login/login.component';
import { ContactService } from './core/services/contact.service';
import { AuthService } from './core/services/auth.service';
import { StorageService } from './core/services/storage.service';
import { ContactFormComponent } from './features/contacts/contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactCardComponent,
    ContactListComponent,
    ReusableSelectComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ContactService, AuthService, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
