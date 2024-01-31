import { Controller, Get, Post, Body, Param, Put, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './schemas/attendance.schema';
import { IsDateString, IsOptional, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

class CreateAttendanceDto {
  @IsDateString({ message: 'Invalid date format. Please provide a valid date string.' })
  checkInTime: Date;

  @IsDateString({ message: 'Invalid date format. Please provide a valid date string.' })
  @IsOptional()
  checkOutTime?: Date;

  @IsOptional()
  checkInType?: string;

  @IsOptional()
  locationHash?: string;

  @IsOptional()
  entityId?: string;

  @IsOptional()
  checkInHash?: string;
  
}

class UpdateAttendanceDto extends CreateAttendanceDto {}

class CheckInDto extends CreateAttendanceDto {
  @IsMongoId({ message: 'Invalid user ID. Please provide a valid MongoDB ID.' })
  userId: string;
}

class CheckOutDto {
  @IsMongoId({ message: 'Invalid user ID. Please provide a valid MongoDB ID.' })
  userId: string;
}

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() attendanceData: CreateAttendanceDto): Promise<Attendance> {
    return this.attendanceService.create(attendanceData);
  }

  @Get()
  findAll(): Promise<Attendance[]> {
    return this.attendanceService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() attendanceData: UpdateAttendanceDto): Promise<Attendance> {
    return this.attendanceService.update(id, attendanceData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Attendance> {
    return this.attendanceService.remove(id);
  }

  @Get('today-status')
  findTodayStatus(@Query('id') userId: string): Promise<Attendance[]> {
    return this.attendanceService.findTodayStatus(userId);
  }

  @Post('checkin')
  checkin(@Body() attendanceData: CheckInDto): Promise<Attendance> {
    return this.attendanceService.checkin(attendanceData);
  }

  @Post('checkout')
  checkout(@Body() attendanceData: CheckOutDto): Promise<Attendance> {
    return this.attendanceService.checkout(attendanceData.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Attendance> {
    return this.attendanceService.findOne(id);
  }
}
export { CreateAttendanceDto, UpdateAttendanceDto, CheckInDto, CheckOutDto };
