import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewEditDialogComponent } from './crew-edit-dialog.component';

describe('CrewEditDialogComponent', () => {
  let component: CrewEditDialogComponent;
  let fixture: ComponentFixture<CrewEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
