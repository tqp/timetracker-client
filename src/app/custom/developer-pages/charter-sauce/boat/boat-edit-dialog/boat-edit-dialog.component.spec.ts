import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatEditDialogComponent } from './boat-edit-dialog.component';

describe('BoatEditDialogComponent', () => {
  let component: BoatEditDialogComponent;
  let fixture: ComponentFixture<BoatEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
