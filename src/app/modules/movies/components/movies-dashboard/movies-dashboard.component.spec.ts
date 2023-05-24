import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesDashboardComponent } from './movies-dashboard.component';

describe('MoviesDashboardComponent', () => {
  let component: MoviesDashboardComponent;
  let fixture: ComponentFixture<MoviesDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesDashboardComponent]
    });
    fixture = TestBed.createComponent(MoviesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
