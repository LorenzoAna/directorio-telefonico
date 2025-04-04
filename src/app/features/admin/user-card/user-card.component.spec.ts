import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { User } from 'src/app/shared/models/user.model';
import { TitleCasePipe } from '@angular/common';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let testUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardComponent],
      imports: [RouterModule, RouterTestingModule],
      providers: [TitleCasePipe],
    });
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Define el usuario de prueba aquí
    testUser = {
      id: '1',
      name: 'Elena',
      phone: 123123123,
      role: 'USER',
      password: '1234',
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  function verifyUserDetails(user: User) {
    component.user = user;
    fixture.detectChanges();

    const name = fixture.debugElement.query(
      By.css('.card-title')
    ).nativeElement;
    const phone = fixture.debugElement.query(
      By.css('.span-phone')
    ).nativeElement;
    const role = fixture.debugElement.query(By.css('.span-role')).nativeElement;

    // para poder usar el pipe titlecase en el rol
    const titleCasePipe = fixture.debugElement.injector.get(TitleCasePipe);

    expect(name.textContent).toBe(`${user.name}`);
    expect(phone.textContent).toBe(`Móvil: ${user.phone}`);
    expect(role.textContent).toBe(`Rol: ${titleCasePipe.transform(user.role)}`);
  }
  it('Debería mostrar los datos correctamente', () => {
    verifyUserDetails(testUser);
  });

  it('Debería emitir el evento userDeleted cuando se llama al método onDelete ', () => {
    component.user = testUser; // Configura el usuario antes de llamar a onDelete
    fixture.detectChanges();

    spyOn(component.userDeleted, 'emit');
    component.onDelete();
    expect(component.userDeleted.emit).toHaveBeenCalledWith('1');
  });

  it('Debería emitir el evento userContacts cuando se llama al método onUserContacts', () => {
    component.user = testUser; // Configura el usuario antes de llamar a onDelete
    fixture.detectChanges();

    spyOn(component.userContacts, 'emit');
    component.onUserContacts();
    expect(component.userContacts.emit).toHaveBeenCalledWith('1');
  });
});
