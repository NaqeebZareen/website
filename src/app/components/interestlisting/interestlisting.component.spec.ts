import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestlistingComponent } from './interestlisting.component';

describe('InterestlistingComponent', () => {
  let component: InterestlistingComponent;
  let fixture: ComponentFixture<InterestlistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestlistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
