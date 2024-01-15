import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendanceModule } from './attendance/attendance.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceSchema } from './attendance/entities/attendance.entity';

@Module({
  imports: [
    AttendanceModule,
    MongooseModule.forRoot('mongodb://mongodb:27017/attendance'),
    MongooseModule.forFeature([
      { name: 'Attendance', schema: AttendanceSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
