import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
 
@Schema()
export class Location {
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}
//business_id=> rakham
//rename location to hash , checkin_hash, business_hash
//attendance_type, wfh , ckeckin


//status
@Schema()
export class Attendance extends Document {

  @Prop()
  userId: string;

  @Prop()
  checkInTime: Date;

  @Prop({ required: false })
  checkOutTime: Date;

  @Prop({ type: Location })
  location: Location;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
