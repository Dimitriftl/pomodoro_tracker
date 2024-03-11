export type taskType = {
  _id: string;
  taskName: string;
  description: string;
  numberOfPomodoroSet: number;
  numberOfPomodoroDone: number;
  taskDone: boolean;
  timeSpend: number;
  status: string;
  creationDate: string;
};

export type passwordType =
  | "currentPassword"
  | "newPassword"
  | "confirmPassword"
  | null;

export type typeOfModalTypes = "delete" | "done" | "giveUp" | "account" | null;
