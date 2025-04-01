import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCardComponent } from './contact-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, RouterLink } from '@angular/router';

describe('ContactCardComponent', () => {
  let component: ContactCardComponent;
  let fixture: ComponentFixture<ContactCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterLink, ActivatedRoute],
      declarations: [ContactCardComponent],
    });
    fixture = TestBed.createComponent(ContactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
