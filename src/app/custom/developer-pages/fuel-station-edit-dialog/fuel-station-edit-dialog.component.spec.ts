import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelStationEditDialogComponent } from './fuel-station-edit-dialog.component';

describe('FuelStationEditDialogComponent', () => {
  let component: FuelStationEditDialogComponent;
  let fixture: ComponentFixture<FuelStationEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelStationEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelStationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
