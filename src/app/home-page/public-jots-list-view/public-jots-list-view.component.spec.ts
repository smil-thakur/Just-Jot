import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicJotsListViewComponent } from './public-jots-list-view.component';

describe('PublicJotsListViewComponent', () => {
  let component: PublicJotsListViewComponent;
  let fixture: ComponentFixture<PublicJotsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicJotsListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicJotsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
