import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitylistingComponent } from './citylisting.component';

describe('CitylistingComponent', () => {
  let component: CitylistingComponent;
  let fixture: ComponentFixture<CitylistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitylistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitylistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
