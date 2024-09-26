import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Person } from 'src/app/interfaces/person.interface';
import { Skill } from 'src/app/interfaces/skill.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TasksService } from '../../services/tasks.service';

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

  constructor(
    private tasksService: TasksService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

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
    this.removeValidators(); //Remove validators from taskAssocciatedPersons
    if (!this.taskForm.valid) {
      this.addValidators(); // If the form is invalid add validators for taskAssocciatedPersons
      return;
    } else {
      try {
        this.tasksService.addTask({
          id: this.tasksService?.getTasks()?.length + 1 || 1,
          taskName: this.taskForm.get('taskName').value,
          taskLimitDate: this.taskForm.get('taskLimitDate').value,
          persons: this.persons,
          isCompleted: false,
        });
        // If the task is created correctly add validators for taskAssocciatedPersons and reset form
        this.addValidators();
        this.taskForm.reset();
        this.persons = [];
        this.skills = [];
        this.openSnackBar('La tarea se creo correctamente', '');
      } catch (error) {
        this.openSnackBar('Ocurrio un error creando la tarea', error.message);
      }
    }
  }

  removeValidators() {
    //Remove validators from subgroup taskAssociatedPersons
    this.taskForm.get('taskAssociatedPersons.personName').clearValidators();
    this.taskForm.get('taskAssociatedPersons.personAge').clearValidators();

    // Say to the form for updated changes
    this.taskForm
      .get('taskAssociatedPersons.personName')
      .updateValueAndValidity();
    this.taskForm
      .get('taskAssociatedPersons.personAge')
      .updateValueAndValidity();
  }

  addValidators() {
    //Add validators for subgroup taskAssociatedPersons
    this.taskForm
      .get('taskAssociatedPersons.personName')
      .addValidators([Validators.required, Validators.minLength(5)]);
    this.taskForm
      .get('taskAssociatedPersons.personAge')
      .addValidators([Validators.required, Validators.min(18)]);
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
    //Get values from subgroup taskAssociatedPersons
    const name: string = this.taskForm.get('taskAssociatedPersons.personName').value;
    const isPersonExist = this.persons.some((person) => person?.name?.toLowerCase() === name?.toLowerCase());
    if (
      this.skills.length <= 0 || // Validate if the actually person has one or more skills
      isPersonExist || // Validate if the person exist into persons Array
      !this.taskForm.valid
    ) {
      return false;
    } else {
      return true;
    }
  }

  addPerson(event: any) {
    event.preventDefault();
    const name: string = this.taskForm.get('taskAssociatedPersons.personName').value;
    const age: number = Number(this.taskForm.get('taskAssociatedPersons.personAge').value);

    if (!this.isValidToAddPersons()) return;

    this.persons.push({
      name: name,
      age: age,
      skills: this.skills,
    });

    this.resetTaskAssociatedPersons();
  }

  resetTaskAssociatedPersons() {
    // Reset subgruop of taskAssociatedPersons and skills
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
