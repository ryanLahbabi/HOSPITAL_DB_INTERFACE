import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreationMedecinComponent } from './form-creation-medecin.component';

describe('FormCreationMedecinComponent', () => {
  let component: FormCreationMedecinComponent;
  let fixture: ComponentFixture<FormCreationMedecinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreationMedecinComponent]
    });
    fixture = TestBed.createComponent(FormCreationMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
