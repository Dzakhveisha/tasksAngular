import {TaskStatus} from "./TaskStatus";

export interface PlannedTask{
  id : number;
  name: string;
  description: string;
  statusId: TaskStatus;
  deadline: string;
  fileName: string;
}
