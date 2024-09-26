import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Person {
  name: string,
  age: number,
  skills: Skill[]
}

export interface Skill {
  name: string
}

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.scss'],
})

export class CreateTasksComponent implements OnInit {
  public taskForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initTaskForm();
  }

  initTaskForm() {
    this.taskForm = this.fb.group({
      personName: ['', Validators.required],
      taskLimitDate: ['', Validators.required],
      taskAssociatedPersons: this.fb.group({
        name: ['', Validators.required, Validators.minLength(5)],
        age: ['', Validators.required, Validators.min(18)],
        skills: [[], Validators.required, Validators.minLength(1)]
      }),
    });
  }

  submitTask() {
    console.log(this.taskForm)
  }
}
