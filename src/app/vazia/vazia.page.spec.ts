import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaziaPage } from './vazia.page';

describe('VaziaPage', () => {
  let component: VaziaPage;
  let fixture: ComponentFixture<VaziaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaziaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaziaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
