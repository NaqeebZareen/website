import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingcardComponent } from './listingcard.component';

describe('ListingcardComponent', () => {
  let component: ListingcardComponent;
  let fixture: ComponentFixture<ListingcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
