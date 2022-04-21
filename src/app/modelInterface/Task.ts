import {TaskStatus} from "./TaskStatus";

export interface PlannedTask{
  id : number;
  name: string;
  description: string;
  status: TaskStatus;
  deadline: string;
  fileName: string;
}
