import { Person } from "./person.interface";

export interface Task {
  id: number;
  taskName: string;
  taskLimitDate: Date;
  persons: Person[];
  isCompleted: boolean;
}
