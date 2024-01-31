import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';
import { CreateAttendanceDto, UpdateAttendanceDto, CheckInDto, CheckOutDto } from './attendance.controller'; // Import the DTOs

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async create(attendanceData: CreateAttendanceDto): Promise<Attendance> {
    const createdAttendance = new this.attendanceModel(attendanceData);

    try {
      return await createdAttendance.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceModel.find().exec();
  }

  async findOne(id: string): Promise<Attendance> {
    const attendance = await this.attendanceModel.findById(id).exec();
    
    if (!attendance) {
      throw new NotFoundException('Attendance record not found');
    }

    return attendance;
  }

  async update(id: string, attendanceData: UpdateAttendanceDto): Promise<Attendance> {
    try {
      return await this.attendanceModel.findByIdAndUpdate(id, attendanceData, { new: true }).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<Attendance> {
    const deletedAttendance = await this.attendanceModel.findByIdAndDelete(id).exec();
    
    if (!deletedAttendance) {
      throw new NotFoundException('Attendance record not found');
    }

    return deletedAttendance;
  }

  async findTodayStatus(userId: string): Promise<Attendance[]> {
    const todayStart = this.getStartOfDay();
    const todayEnd = this.getEndOfDay();

    return this.attendanceModel
      .find({
        userId: userId,
        checkInTime: { $gte: todayStart, $lte: todayEnd },
      })
      .exec();
  }

  async checkin(attendanceData: CheckInDto): Promise<Attendance> {
    // Check if today's status exists for the user
    const todayStatus = await this.attendanceModel.findOne({
      userId: attendanceData.userId,
      checkInTime: { $gte: this.getStartOfDay(), $lte: this.getEndOfDay() },
    });

    if (todayStatus) {
      // Today's status already exists, throw an error
      throw new BadRequestException('Attendance record already exists for today');
    }

    // Today's status does not exist, create a new document
    const createdAttendance = new this.attendanceModel(attendanceData);

    try {
      return await createdAttendance.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async checkout(userId: string): Promise<Attendance> {
    // Check if today's status exists for the user
    const todayStatus = await this.attendanceModel.findOne({
      userId: userId,
      checkInTime: { $gte: this.getStartOfDay(), $lte: this.getEndOfDay() },
    });
  
    if (!todayStatus) {
      // Today's status does not exist, throw an error
      throw new BadRequestException('No attendance record found for today');
    }
  
    // Today's status exists, update only the checkout time
    todayStatus.checkOutTime = new Date();

    try {
      return await todayStatus.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private getStartOfDay(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  private getEndOfDay(): Date {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return today;
  }
}
