import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableSelectComponent } from './reusable-select.component';

describe('ReusableSelectComponent', () => {
  let component: ReusableSelectComponent;
  let fixture: ComponentFixture<ReusableSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReusableSelectComponent]
    });
    fixture = TestBed.createComponent(ReusableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
