import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntuitTokensComponent } from './intuit-tokens.component';

describe('IntuitTokensComponent', () => {
  let component: IntuitTokensComponent;
  let fixture: ComponentFixture<IntuitTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntuitTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntuitTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
