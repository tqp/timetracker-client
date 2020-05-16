import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelActivityEditDialogComponent } from './fuel-activity-edit-dialog.component';

describe('FuelActivityEditDialogComponent', () => {
  let component: FuelActivityEditDialogComponent;
  let fixture: ComponentFixture<FuelActivityEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelActivityEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelActivityEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
