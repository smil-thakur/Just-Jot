import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JotCardComponent } from './jot-card.component';

describe('JotCardComponent', () => {
  let component: JotCardComponent;
  let fixture: ComponentFixture<JotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JotCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
