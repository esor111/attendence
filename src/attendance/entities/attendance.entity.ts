import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
 
@Schema()
export class Location {
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}

@Schema()
export class Attendance extends Document {

  @Prop()
  userId: number;

  @Prop()
  checkInTime: Date;

  @Prop({ required: false })
  checkOutTime: Date;

  @Prop({ type: Location })
  location: Location;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
