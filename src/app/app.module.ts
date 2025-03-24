import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactCardComponent } from './features/contact-card/contact-card.component';
import { ContactListComponent } from './features/contact-list/contact-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './core/services/contact.service';
import { ReusableButtonComponent } from './shared/components/reusable-button/reusable-button.component';
import { ReusableSelectComponent } from './shared/components/reusable-select/reusable-select.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactCardComponent,
    ContactListComponent,
    ReusableButtonComponent,
    ReusableSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
