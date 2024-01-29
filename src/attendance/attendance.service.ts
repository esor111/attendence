import { Injectable } from '@nestjs/common';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as ngeohash from 'ngeohash';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel('Attendance')
    private readonly attendanceModel: Model<Attendance>,
  ) {}

  async createAttendance(attendanceData: any): Promise<any> {
    const newAttendance = new this.attendanceModel(attendanceData);
    return await newAttendance.save();
  }

  async createAttendancebygeohash(userId:number): Promise<any> {
    const officeLatitude = 27.763791318853695;
    const officeLongitude = 85.35175826811357;
    const userhash = 'tuutynprb'; 
    const officeGeoHash =await this.generateGeoHash(officeLatitude, officeLongitude);
    const comparehash = this.CompareGeoHash(officeGeoHash, userhash);
    if(comparehash){
      return "working as exprect"
    }else{
      return 'try again until work'
    }
  }


  findAll() {
    return this.attendanceModel.find();
  }
  generateGeoHash(lat: number, lon: number) {
    return ngeohash.encode(lat, lon);
  }

  CompareGeoHash(officehash: string, userhash: string) {
    if (officehash === userhash) {
      return true;
    } else {
      return false;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
