import { Controller, Get, Post, Body, Param, Put, Delete, Query, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './schemas/attendance.schema';
import { CheckInDto,  CreateAttendanceDto, UpdateAttendanceDto } from './attendance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("attandance")
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() attendanceData: CreateAttendanceDto, @Req() req): Promise<Attendance> {
    const userInfo = req['user'];
    return this.attendanceService.create(attendanceData, userInfo?.id);
  }
  @ApiBearerAuth()
  @Get()
  findAll(): Promise<Attendance[]> {
    return this.attendanceService.findAll();
  }

  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() attendanceData: UpdateAttendanceDto): Promise<Attendance> {
    return this.attendanceService.update(id, attendanceData);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Attendance> {
    return this.attendanceService.remove(id);
  }

  @ApiBearerAuth()
  @Get('today-status')
  findTodayStatus(@Query('id') userId: string): Promise<Attendance[]> {
    return this.attendanceService.findTodayStatus(userId);
  }

  @ApiBearerAuth()
  @Post('checkin')
  checkin(@Body() attendanceData: CheckInDto, @Req() req): Promise<Attendance> {
    const userInfo = req['user'];
    return this.attendanceService.checkin(attendanceData, userInfo?.id);
  }

  @ApiBearerAuth()
  @Post('checkout')
  checkout(@Req() req): Promise<Attendance> {
    const userInfo = req['user'];
    return this.attendanceService.checkout(userInfo?.id);
  }
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Attendance> {
    return this.attendanceService.findOne(id);
  }
}
export { CreateAttendanceDto, UpdateAttendanceDto, CheckInDto };
