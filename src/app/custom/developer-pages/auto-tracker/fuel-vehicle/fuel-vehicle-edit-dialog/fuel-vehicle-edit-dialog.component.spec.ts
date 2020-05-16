import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelVehicleEditDialogComponent } from './fuel-vehicle-edit-dialog.component';

describe('FuelVehicleEditDialogComponent', () => {
  let component: FuelVehicleEditDialogComponent;
  let fixture: ComponentFixture<FuelVehicleEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelVehicleEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelVehicleEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
