import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaEdicaoPage } from './tarefa-edicao.page';

describe('TarefaEdicaoPage', () => {
  let component: TarefaEdicaoPage;
  let fixture: ComponentFixture<TarefaEdicaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefaEdicaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefaEdicaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
