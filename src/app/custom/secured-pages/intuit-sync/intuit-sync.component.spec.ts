import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntuitSyncComponent } from './intuit-sync.component';

describe('IntuitSyncComponent', () => {
  let component: IntuitSyncComponent;
  let fixture: ComponentFixture<IntuitSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntuitSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntuitSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
