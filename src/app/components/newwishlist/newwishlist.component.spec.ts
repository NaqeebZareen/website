import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewwishlistComponent } from './newwishlist.component';

describe('NewwishlistComponent', () => {
  let component: NewwishlistComponent;
  let fixture: ComponentFixture<NewwishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewwishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewwishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
