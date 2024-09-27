import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavbarComponent } from './app-navbar.component';
import { provideRouter, RouterModule } from '@angular/router';

describe('AppNavbarComponent', () => {
  let component: AppNavbarComponent;
  let fixture: ComponentFixture<AppNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppNavbarComponent],
      imports: [RouterModule],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(AppNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
