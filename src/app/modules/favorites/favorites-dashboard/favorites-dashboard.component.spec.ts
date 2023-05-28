import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesDashboardComponent } from './favorites-dashboard.component';

describe('FavoritesDashboardComponent', () => {
  let component: FavoritesDashboardComponent;
  let fixture: ComponentFixture<FavoritesDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesDashboardComponent]
    });
    fixture = TestBed.createComponent(FavoritesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
