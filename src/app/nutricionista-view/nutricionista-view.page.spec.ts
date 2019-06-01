import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricionistaViewPage } from './nutricionista-view.page';

describe('NutricionistaViewPage', () => {
  let component: NutricionistaViewPage;
  let fixture: ComponentFixture<NutricionistaViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutricionistaViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutricionistaViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
