import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewscardwithoutimgComponent } from './newscardwithoutimg.component';

describe('NewscardwithoutimgComponent', () => {
  let component: NewscardwithoutimgComponent;
  let fixture: ComponentFixture<NewscardwithoutimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewscardwithoutimgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewscardwithoutimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
