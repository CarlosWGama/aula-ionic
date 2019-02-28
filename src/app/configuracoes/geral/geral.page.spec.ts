import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeralPage } from './geral.page';

describe('GeralPage', () => {
  let component: GeralPage;
  let fixture: ComponentFixture<GeralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
