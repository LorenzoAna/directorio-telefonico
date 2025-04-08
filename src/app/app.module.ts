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
import { RegisterComponent } from './features/authentication/register/register.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { ContactService } from './core/services/contact.service';
import { AuthService } from './core/services/auth.service';
import { StorageService } from './core/services/storage.service';
import { ContactFormComponent } from './features/contacts/contact-form/contact-form.component';
import { UsersListComponent } from './features/admin/users-list/users-list.component';
import { UserCardComponent } from './features/admin/user-card/user-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastComponent } from './shared/components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactCardComponent,
    ContactListComponent,
    ReusableSelectComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    ContactFormComponent,
    UsersListComponent,
    UserCardComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule,
  ],
  providers: [ContactService, AuthService, StorageService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
