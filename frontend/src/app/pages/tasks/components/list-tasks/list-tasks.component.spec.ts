import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTasksComponent } from './list-tasks.component';
import { provideRouter } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ListTasksComponent', () => {
  let component: ListTasksComponent;
  let fixture: ComponentFixture<ListTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTasksComponent],
      imports: [MatRadioModule, ReactiveFormsModule, FormsModule],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(ListTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
