export interface User {
  id: string;
  name: string;
  password: string;
  age: number;
  email: string;
  workExperience: number;
  position: string;
  isSatisfied: boolean;
  isAdmin?: boolean;
}
