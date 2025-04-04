import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ContactListComponent } from './contact-list.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ReusableSelectComponent } from 'src/app/shared/components/reusable-select/reusable-select.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [
        ContactListComponent,
        SidebarComponent,
        ReusableSelectComponent,
      ],
    });
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
