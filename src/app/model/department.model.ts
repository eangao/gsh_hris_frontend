import { ICluster } from "./cluster.model";
import { IEmployee } from "./employee.model";


export interface IDepartment {
  id?: number;
  name?: string | null;
  employees?: IEmployee[] | null;
  cluster?: ICluster;
}

export class Department implements IDepartment {
  constructor(public id?: number, public name?: string | null, public employees?: IEmployee[] | null, public cluster?: ICluster) {}
}

export function getDepartmentIdentifier(department: IDepartment): number | undefined {
  return department.id;
}
