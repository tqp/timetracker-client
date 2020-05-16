import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoExpenseEditDialogComponent } from './auto-expense-edit-dialog.component';

describe('AutoExpenseEditDialogComponent', () => {
  let component: AutoExpenseEditDialogComponent;
  let fixture: ComponentFixture<AutoExpenseEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoExpenseEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoExpenseEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
