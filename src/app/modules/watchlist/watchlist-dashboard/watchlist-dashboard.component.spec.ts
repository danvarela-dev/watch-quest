import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WathchlistDashboardComponent } from './wathchlist-dashboard.component';

describe('WathchlistDashboardComponent', () => {
  let component: WathchlistDashboardComponent;
  let fixture: ComponentFixture<WathchlistDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WathchlistDashboardComponent]
    });
    fixture = TestBed.createComponent(WathchlistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
