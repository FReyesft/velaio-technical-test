import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.scss'],
})
export class CreateTasksComponent implements OnInit {
  public taskForm: FormGroup;
  public addOnBlur = true;
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;

  get skillsArray(): FormArray {
    return this.taskForm.get('taskAssociatedPersons.skills') as FormArray;
  }

  get personsArray(): FormArray {
    return this.taskForm.get('persons') as FormArray;
  }

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
        skills: this.fb.array(
          [],
          [Validators.required, Validators.minLength(1)]
        ),
      }),
      persons: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
    });
  }

  submitTask() {
    this.removeValidators();
    if (this.taskForm.valid && this.personsArray.valid) {
      this.tasksService.addTask({
        id: Number(Date.now()),
        taskName: this.taskForm.get('taskName').value,
        taskLimitDate: this.taskForm.get('taskLimitDate').value,
        persons: this.personsArray.value,
        isCompleted: false,
      });
      this.personsArray.clear();
      this.taskForm.reset();
      this.addValidators();
      this.openSnackBar('La tarea se creó correctamente', '');
    } else {
      this.addValidators();
      this.openSnackBar('El formulario no es válido', '');
    }
  }

  removeValidators() {
    //Remove validators from subgroup taskAssociatedPersons
    this.taskForm.get('taskAssociatedPersons.personName').clearValidators();
    this.taskForm.get('taskAssociatedPersons.personAge').clearValidators();
    this.taskForm.get('taskAssociatedPersons.skills').clearValidators();

    // Say to the form for updated changes
    this.taskForm
      .get('taskAssociatedPersons.personName')
      .updateValueAndValidity();
    this.taskForm
      .get('taskAssociatedPersons.personAge')
      .updateValueAndValidity();
    this.taskForm.get('taskAssociatedPersons.skills').updateValueAndValidity();
  }

  addValidators() {
    //Add validators for subgroup taskAssociatedPersons
    this.taskForm
      .get('taskAssociatedPersons.personName')
      .addValidators([Validators.required, Validators.minLength(5)]);
    this.taskForm
      .get('taskAssociatedPersons.personAge')
      .addValidators([Validators.required, Validators.min(18)]);
    this.taskForm
      .get('taskAssociatedPersons.skills')
      .addValidators([Validators.required, Validators.minLength(1)]);
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.skillsArray.push(new FormControl(value));
    }

    event.chipInput!.clear();
  }

  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  editSkill(index: number, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.removeSkill(index);
    } else {
      this.skillsArray.at(index).setValue(value);
    }
  }

  isValidToAddPersons(): boolean {
    return this.taskForm.get('taskAssociatedPersons').valid;
  }

  addPerson(event: any) {
    event.preventDefault();
    const personName = this.taskForm.get(
      'taskAssociatedPersons.personName'
    ).value;
    const personAge = this.taskForm.get(
      'taskAssociatedPersons.personAge'
    ).value;

    if (this.isValidToAddPersons()) {
      this.personsArray.push(
        this.fb.group({
          name: [personName, [Validators.required, Validators.minLength(5)]],
          age: [personAge, [Validators.required, Validators.min(18)]],
          skills: this.fb.array(this.skillsArray.value),
        })
      );
      this.resetTaskAssociatedPersons();
    }
  }

  resetTaskAssociatedPersons() {
    // Reset subgruop of taskAssociatedPersons and skills
    this.taskForm.get('taskAssociatedPersons').reset();
    this.skillsArray.clear();
  }

  removePerson(index: number): void {
    this.personsArray.removeAt(index);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
