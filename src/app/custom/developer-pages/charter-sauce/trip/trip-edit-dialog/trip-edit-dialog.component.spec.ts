import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripEditDialogComponent } from './trip-edit-dialog.component';

describe('TripEditDialogComponent', () => {
  let component: TripEditDialogComponent;
  let fixture: ComponentFixture<TripEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
