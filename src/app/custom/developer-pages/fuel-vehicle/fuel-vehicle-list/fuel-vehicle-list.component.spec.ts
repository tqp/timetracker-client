import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelVehicleListComponent } from './fuel-vehicle-list.component';

describe('FuelVehicleListComponent', () => {
  let component: FuelVehicleListComponent;
  let fixture: ComponentFixture<FuelVehicleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelVehicleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
