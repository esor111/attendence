import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  Param, 
  Post,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './dto/create-attendance.dto';
import * as geolib from 'geolib';
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('record-attendance')
  async recordAttendance(
    @Body() attendanceDto: AttendanceDto,
    @Headers('authorization') token: any
  ): Promise<string> {
    try {
      let extractedToken = token.split('Bearer ')[1]; 
      const decoded = jwt.decode(extractedToken);
      console.log('Decoded workingman please:', decoded);
      const currentlocation = {
        latitude: 27.699790662297044,
        longitude: 85.32809136433072,
      };
      const distance = geolib.getDistance(
        { latitude: currentlocation.latitude, longitude: currentlocation.longitude },
        { latitude: attendanceDto.latitude, longitude: attendanceDto.longitude },
      );
      if (distance > 100) {
      throw new HttpException("you cannot attend", 400)
      }
      const newAttendance = { 
        userId: 1,
        checkInTime: new Date(),
        location: {
          latitude: attendanceDto.latitude,
          longitude: attendanceDto.longitude,
        },
      };
      let data = await this.attendanceService.createAttendance(newAttendance);
      return data;
    } catch (error) {
      return error
    }
  }


  

  @Get("geohash")
 async createattendance(
  @Headers('authorization') token: any
 ) {
  let extractedToken = token.split('Bearer ')[1]; 
  const decoded = jwt.decode(extractedToken);
  console.log(decoded?.id)
   const attendance=await this.attendanceService.createAttendancebygeohash(decoded?.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}
