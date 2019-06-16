import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakerProfileComponent } from './matchmaker-profile.component';

describe('MatchmakerProfileComponent', () => {
  let component: MatchmakerProfileComponent;
  let fixture: ComponentFixture<MatchmakerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmakerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmakerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
