import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesEditDialogComponent } from './series-edit-dialog.component';

describe('SeriesEditDialogComponent', () => {
  let component: SeriesEditDialogComponent;
  let fixture: ComponentFixture<SeriesEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
