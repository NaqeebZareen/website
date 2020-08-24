import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularActivityListComponent } from './popular-activity-list.component';

describe('PopularActivityListComponent', () => {
  let component: PopularActivityListComponent;
  let fixture: ComponentFixture<PopularActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
