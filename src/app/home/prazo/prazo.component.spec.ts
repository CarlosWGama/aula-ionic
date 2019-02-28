import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrazoComponent } from './prazo.component';

describe('PrazoComponent', () => {
  let component: PrazoComponent;
  let fixture: ComponentFixture<PrazoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrazoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
