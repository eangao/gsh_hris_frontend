import { ILeave } from "./leave.model";


export interface ILeaveType {
  id?: number;
  name?: string | null;
  description?: string | null;
  leaves?: ILeave[] | null;
}

export class LeaveType implements ILeaveType {
  constructor(public id?: number, public name?: string | null, public description?: string | null, public leaves?: ILeave[] | null) {}
}

export function getLeaveTypeIdentifier(leaveType: ILeaveType): number | undefined {
  return leaveType.id;
}
