import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { Task } from 'src/app/interfaces/task.interface';

describe('TasksService', () => {
  let service: TasksService;

  const mockLocalStorage = (() => {
    let store: { [key: string]: string } = {};

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    };
  })();

  beforeEach(() => {
    spyOn(window.localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(window.localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(window.localStorage, 'clear').and.callFake(mockLocalStorage.clear);
    spyOn(window.localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks from localStorage', () => {
    const tasks: Task[] = [
      {
        id: 1,
        taskName: 'Task 1',
        taskLimitDate: new Date('2024-09-27T15:52:25.210Z'),
        persons: [{ name: 'John Doe', age: 30, skills: [{ name: 'TypeScript' }] }],
        isCompleted: false,
      },
      {
        id: 2,
        taskName: 'Task 2',
        taskLimitDate: new Date('2024-09-27T15:52:25.210Z'),
        persons: [{ name: 'John Doe', age: 30, skills: [{ name: 'TypeScript' }] }],
        isCompleted: false,
      },
    ];

    localStorage.setItem('tasks', JSON.stringify(tasks));

    const retrievedTasks = service.getTasks();
    expect(retrievedTasks.length).toBe(tasks.length);

    for (let i = 0; i < tasks.length; i++) {
      expect(retrievedTasks[i]).toEqual(jasmine.objectContaining({
        id: tasks[i].id,
        taskName: tasks[i].taskName,
        taskLimitDate: jasmine.any(Date),
        persons: tasks[i].persons,
        isCompleted: tasks[i].isCompleted,
      }));
    }
  });

  it('should add a task to localStorage', () => {
    const newTask: Task = {
      id: 1,
      taskName: 'Task 1',
      taskLimitDate: new Date('2024-09-27T15:57:29.669Z'),
      persons: [{ name: 'John Doe', age: 30, skills: [{ name: 'TypeScript' }] }],
      isCompleted: false,
    };

    service.addTask(newTask);

    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);

    expect(tasks[0]).toEqual(jasmine.objectContaining({
      id: 1,
      taskName: 'Task 1',
      taskLimitDate: jasmine.any(Date),
      persons: [{ name: 'John Doe', age: 30, skills: [{ name: 'TypeScript' }] }],
      isCompleted: false,
    }));
  });

  it('should handle empty localStorage when getting tasks', () => {
    const retrievedTasks = service.getTasks();
    expect(retrievedTasks).toEqual([]);
  });
});
