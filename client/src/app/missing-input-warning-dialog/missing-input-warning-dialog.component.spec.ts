import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingInputWarningDialogComponent } from './missing-input-warning-dialog.component';

describe('MissingInputWarningDialogComponent', () => {
  let component: MissingInputWarningDialogComponent;
  let fixture: ComponentFixture<MissingInputWarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingInputWarningDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingInputWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
