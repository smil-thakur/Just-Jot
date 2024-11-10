import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJotDialogComponent } from './create-jot-dialog.component';

describe('CreateJotDialogComponent', () => {
  let component: CreateJotDialogComponent;
  let fixture: ComponentFixture<CreateJotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateJotDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
