import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSuggestedInterestComponent } from './home-suggested-interest.component';

describe('HomeSuggestedInterestComponent', () => {
  let component: HomeSuggestedInterestComponent;
  let fixture: ComponentFixture<HomeSuggestedInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSuggestedInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSuggestedInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
