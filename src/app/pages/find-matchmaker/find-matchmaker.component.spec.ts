import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMatchmakerComponent } from './find-matchmaker.component';

describe('FindMatchmakerComponent', () => {
  let component: FindMatchmakerComponent;
  let fixture: ComponentFixture<FindMatchmakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindMatchmakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindMatchmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
