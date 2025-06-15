export interface Test {
  id: string;
  result?: TestResult;
  userId: string;
  status: 'success' | 'pending';
  isAskedForHelp?: boolean;
  createdAt: Date;
}

export interface TestResult {
  id: string;
  questions: TestQuestion[];
  createdAt: Date;
}

export interface TestQuestion {
  id: string;
  text: string;
  weight: number;
}
