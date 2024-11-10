import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudJotsListViewComponent } from './cloud-jots-list-view.component';

describe('CloudJotsListViewComponent', () => {
  let component: CloudJotsListViewComponent;
  let fixture: ComponentFixture<CloudJotsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudJotsListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudJotsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
