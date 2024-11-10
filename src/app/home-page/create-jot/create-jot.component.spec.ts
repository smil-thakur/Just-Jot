import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJotComponent } from './create-jot.component';

describe('CreateJotComponent', () => {
  let component: CreateJotComponent;
  let fixture: ComponentFixture<CreateJotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateJotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
