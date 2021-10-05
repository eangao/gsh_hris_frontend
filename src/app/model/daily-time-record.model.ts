import * as dayjs from 'dayjs';
import { IEmployee } from './employee.model';


export interface IDailyTimeRecord {
  id?: number;
  dateTimeIn?: dayjs.Dayjs | null;
  dateTimeOut?: dayjs.Dayjs | null;
  employee?: IEmployee | null;
}

export class DailyTimeRecord implements IDailyTimeRecord {
  constructor(
    public id?: number,
    public dateTimeIn?: dayjs.Dayjs | null,
    public dateTimeOut?: dayjs.Dayjs | null,
    public employee?: IEmployee | null
  ) {}
}

export function getDailyTimeRecordIdentifier(dailyTimeRecord: IDailyTimeRecord): number | undefined {
  return dailyTimeRecord.id;
}
