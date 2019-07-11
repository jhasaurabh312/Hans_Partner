import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFamilyComponent } from './client-family.component';

describe('ClientFamilyComponent', () => {
  let component: ClientFamilyComponent;
  let fixture: ComponentFixture<ClientFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
