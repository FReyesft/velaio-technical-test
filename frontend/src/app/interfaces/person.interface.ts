import { Skill } from "./skill.interface";

export interface Person {
  name: string;
  age: number;
  skills: Skill[];
}
