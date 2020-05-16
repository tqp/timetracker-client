import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategoryEditDialogComponent } from './expense-category-edit-dialog.component';

describe('ExpenseCategoryEditDialogComponent', () => {
  let component: ExpenseCategoryEditDialogComponent;
  let fixture: ComponentFixture<ExpenseCategoryEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseCategoryEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCategoryEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
