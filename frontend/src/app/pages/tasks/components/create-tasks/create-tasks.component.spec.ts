import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTasksComponent } from './create-tasks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MuiModule } from 'src/app/modules/mui/mui.module';
import { RouterModule } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('CreateTasksComponent', () => {
  let component: CreateTasksComponent;
  let fixture: ComponentFixture<CreateTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTasksComponent],
      imports: [MatNativeDateModule, ReactiveFormsModule, MuiModule],
      providers: [provideAnimations()],
    });
    fixture = TestBed.createComponent(CreateTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
