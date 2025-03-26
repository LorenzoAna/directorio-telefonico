import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactCardComponent } from './features/contacts/contact-card/contact-card.component';
import { ContactListComponent } from './features/contacts/contact-list/contact-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './core/services/contact.service';
import { ReusableSelectComponent } from './shared/components/reusable-select/reusable-select.component';
import { SidebarComponent } from './features/contacts/sidebar/sidebar.component';
import { LoginComponent } from './features/users/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './features/users/register/register.component';
import { UserService } from './core/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactCardComponent,
    ContactListComponent,
    ReusableSelectComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ContactService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
