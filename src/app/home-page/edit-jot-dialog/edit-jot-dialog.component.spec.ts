import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJotDialogComponent } from './edit-jot-dialog.component';

describe('EditJotDialogComponent', () => {
  let component: EditJotDialogComponent;
  let fixture: ComponentFixture<EditJotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditJotDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
