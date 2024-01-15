import { PartialType } from '@nestjs/mapped-types';
import { AttendanceDto } from './create-attendance.dto';

export class UpdateAttendanceDto extends PartialType(AttendanceDto) {}
