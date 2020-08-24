import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListCardComponent } from './wishList-card.component';

describe('WishListCardComponent', () => {
  let component: WishListCardComponent;
  let fixture: ComponentFixture<WishListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WishListCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
