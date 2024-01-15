import { Injectable } from '@nestjs/common';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class AttendanceService {

  constructor(@InjectModel('Attendance') private readonly attendanceModel: Model<Attendance>) {}

  async createAttendance(attendanceData: any): Promise<any> {
    const newAttendance = new this.attendanceModel(attendanceData);
    return await newAttendance.save();
  }

  findAll() {
    return `This action returns all attendance`;
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
