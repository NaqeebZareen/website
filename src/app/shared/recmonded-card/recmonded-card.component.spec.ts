import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecmondedCardComponent } from './recmonded-card.component';

describe('RecmondedCardComponent', () => {
  let component: RecmondedCardComponent;
  let fixture: ComponentFixture<RecmondedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecmondedCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecmondedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
