import { Person } from "./person.interface";

export interface Task {
  taskName: string;
  taskLimitDate: Date;
  persons: Person[];
  isCompleted: boolean;
}
