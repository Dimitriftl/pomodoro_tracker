export type taskType = {
  _id: string;
  taskName: string;
  description: string;
  numberOfPomodoroSet: number;
  numberOfPomodoroDone: number;
  timeSpend: number;
  status: "active" | "delete" | "done" | "gaveUp";
  creationDate: string;
  finishedDate: Date | null;
};

export type passwordType =
  | "currentPassword"
  | "newPassword"
  | "confirmPassword"
  | null;

export type typeOfModalTypes = "delete" | "done" | "giveUp" | "account" | null;
