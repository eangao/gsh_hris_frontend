import * as dayjs from 'dayjs';
import { IUser } from './user.model';
import { IPosition } from './position.model';
import { IDutySchedule } from './duty-schedule.model';
import { IDailyTimeRecord } from './daily-time-record.model';
import { IBenefits } from './benefits.model';
import { IDependents } from './dependents.model';
import { IEducation } from './education.model';
import { ITrainingHistory } from './training-history.model';
import { ILeave } from './leave.model';
import { IDepartment } from './department.model';
import { IEmploymentType } from './employment-type.model';

export interface IEmployee {
  id?: number;
  employeeId?: number;
  username?: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  nameSuffix?: string | null;
  birthdate?: dayjs.Dayjs | null;
  sex?: boolean | null;
  mobileNumber?: string | null;
  email?: string | null;
  isNotLocked?: boolean | null;
  dateHired?: dayjs.Dayjs | null;
  dateDeno?: dayjs.Dayjs | null;
  sickLeaveYearlyCredit?: number | null;
  sickLeaveYearlyCreditUsed?: number | null;
  leaveYearlyCredit?: number | null;
  leaveYearlyCreditUsed?: number | null;
  user?: IUser;
  positions?: IPosition[] | null;
  dutySchedules?: IDutySchedule[] | null;
  dailyTimeRecords?: IDailyTimeRecord[] | null;
  benefits?: IBenefits[] | null;
  dependents?: IDependents[] | null;
  educations?: IEducation[] | null;
  trainingHistories?: ITrainingHistory[] | null;
  leaves?: ILeave[] | null;
  department?: IDepartment;
  employmentType?: IEmploymentType;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public employeeId?: number,
    public username?: string,
    public firstName?: string | null,
    public middleName?: string | null,
    public lastName?: string | null,
    public nameSuffix?: string | null,
    public birthdate?: dayjs.Dayjs | null,
    public sex?: boolean | null,
    public mobileNumber?: string | null,
    public email?: string | null,
    public isNotLocked?: boolean | null,
    public dateHired?: dayjs.Dayjs | null,
    public dateDeno?: dayjs.Dayjs | null,
    public sickLeaveYearlyCredit?: number | null,
    public sickLeaveYearlyCreditUsed?: number | null,
    public leaveYearlyCredit?: number | null,
    public leaveYearlyCreditUsed?: number | null,
    public user?: IUser,
    public positions?: IPosition[] | null,
    public dutySchedules?: IDutySchedule[] | null,
    public dailyTimeRecords?: IDailyTimeRecord[] | null,
    public benefits?: IBenefits[] | null,
    public dependents?: IDependents[] | null,
    public educations?: IEducation[] | null,
    public trainingHistories?: ITrainingHistory[] | null,
    public leaves?: ILeave[] | null,
    public department?: IDepartment,
    public employmentType?: IEmploymentType
  ) {
    this.sex = this.sex ?? false;
    this.isNotLocked = this.isNotLocked ?? false;
  }
}

export function getEmployeeIdentifier(employee: IEmployee): number | undefined {
  return employee.id;
}
