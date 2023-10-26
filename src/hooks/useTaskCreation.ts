import { useContext } from "react";
import { TasksContext } from "../context/MyProviders";

interface Task {
  taskName: string;
  numberOfPomodoroSet: number;
  numberOfpomodoroDone: number;
  creationDate: Date;
  id: string;
  timeFocused: number;
}

export const useTaskCreation = (
  taskName: string,
  numberOfPomodoroSet: number,
  numberOfpomodoroDone: number,
  creationDate: Date,
  id: string,
  timeFocused: number
) => {
  const { tasks, setTasks } = useContext(TasksContext);

  const createNewTask = () => {
    const newTask: Task = {
      taskName: taskName,
      numberOfPomodoroSet: numberOfPomodoroSet,
      numberOfpomodoroDone: numberOfpomodoroDone,
      creationDate: creationDate,
      id: id,
      timeFocused: timeFocused,
    };
    setTasks([...tasks, newTask]);
  };

  return createNewTask;
};
