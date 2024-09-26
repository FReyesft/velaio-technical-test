import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Person } from 'src/app/interfaces/person.interface';
import { Skill } from 'src/app/interfaces/skill.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.scss'],
})
export class CreateTasksComponent implements OnInit {
  public taskForm: FormGroup;
  public skills: Skill[] = [];
  public addOnBlur = true;
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public persons: Person[] = [];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.initTaskForm();
  }

  initTaskForm() {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      taskLimitDate: ['', Validators.required],
      taskAssociatedPersons: this.fb.group({
        personName: ['', [Validators.required, Validators.minLength(5)]],
        personAge: ['', [Validators.required, Validators.min(18)]],
      }),
    });
  }

  submitTask() {
    this.removeValidators();
    if (!this.taskForm.valid) {
      this.addValidators();
      return;
    } else {
      this.addValidators();
      this.taskForm.reset();
      this.openSnackBar('La tarea se creo correctamente', '');
    }
    console.log(this.taskForm);
  }

  removeValidators() {
    this.taskForm.get('taskAssociatedPersons.personName').clearValidators();
    this.taskForm.get('taskAssociatedPersons.personAge').clearValidators();

    this.taskForm.get('taskAssociatedPersons.personName').updateValueAndValidity();
    this.taskForm.get('taskAssociatedPersons.personAge').updateValueAndValidity();
  }

  addValidators() {
    this.taskForm.get('taskAssociatedPersons.personName').addValidators([Validators.required, Validators.minLength(5)]);
    this.taskForm.get('taskAssociatedPersons.personAge').addValidators([Validators.required, Validators.min(18)]);
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.skills.push({ name: value });
    }

    event.chipInput!.clear();
  }

  removeSkill(skill: Skill): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  editSkill(skill: Skill, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeSkill(skill);
      return;
    }

    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills[index].name = value;
    }
  }

  isValidToAddPersons(): boolean {
    const name: string = this.taskForm.get(
      'taskAssociatedPersons.personName'
    ).value;
    const age: number = Number(
      this.taskForm.get('taskAssociatedPersons.personAge').value
    );
    const isPersonExist = this.persons.some(
      (person) => person?.name?.toLowerCase() === name?.toLowerCase()
    );

    if (
      this.skills.length <= 0 ||
      isPersonExist ||
      !this.taskForm.valid ||
      age < 18
    ) {
      return false;
    } else {
      return true;
    }
  }

  addPerson(event: any) {
    event.preventDefault();
    const name: string = this.taskForm.get(
      'taskAssociatedPersons.personName'
    ).value;
    const age: number = Number(
      this.taskForm.get('taskAssociatedPersons.personAge').value
    );

    //Validations
    if (!this.isValidToAddPersons()) return;

    this.persons.push({
      name: name,
      age: age,
      skills: this.skills,
    });

    this.resetTaskAssociatedPersons();
  }

  resetTaskAssociatedPersons() {
    this.taskForm.get('taskAssociatedPersons').reset();
    this.skills = [];
  }

  removePerson(person: Person): void {
    const index = this.persons.indexOf(person);

    if (index >= 0) {
      this.persons.splice(index, 1);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
