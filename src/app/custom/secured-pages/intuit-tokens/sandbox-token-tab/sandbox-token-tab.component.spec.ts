import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxTokenTabComponent } from './sandbox-token-tab.component';

describe('SandboxTokenTabComponent', () => {
  let component: SandboxTokenTabComponent;
  let fixture: ComponentFixture<SandboxTokenTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxTokenTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxTokenTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
