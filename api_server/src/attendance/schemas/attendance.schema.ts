import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsDateString, IsOptional, IsMongoId } from 'class-validator';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {
  @Prop({ required: true })
  // @IsMongoId({ message: 'Invalid user ID. Please provide a valid MongoDB ID.' })
  userId: string;

  @Prop({ type: Date })
  @IsDateString({ message: 'Invalid date format. Please provide a valid date string.' })
  @IsOptional()
  checkOutTime: Date;

  @Prop({ type: Date })
  @IsDateString({ message: 'Invalid date format. Please provide a valid date string.' })
  @IsOptional()
  checkInTime: Date;

  @Prop()
  @IsOptional()
  checkInType: string;

  @Prop()
  @IsOptional()
  locationHash: string;

  @Prop()
  @IsOptional()
  entityId: string;

  @Prop()
  @IsOptional()
  checkInHash: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
