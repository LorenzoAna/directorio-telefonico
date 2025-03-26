import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactCardComponent } from './features/contact-card/contact-card.component';
import { ContactListComponent } from './features/contact-list/contact-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './core/services/contact.service';
import { ReusableSelectComponent } from './shared/components/reusable-select/reusable-select.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { LoginComponent } from './features/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContactCardComponent,
    ContactListComponent,
    ReusableSelectComponent,
    SidebarComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ContactService],
  bootstrap: [AppComponent],
})
export class AppModule {}
