import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionTokenTabComponent } from './production-token-tab.component';

describe('ProductionTokenTabComponent', () => {
  let component: ProductionTokenTabComponent;
  let fixture: ComponentFixture<ProductionTokenTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionTokenTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionTokenTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
