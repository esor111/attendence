import { IsDateString, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty({
    description: 'Check-in time in date format',
    example: '2024-02-01T12:00:00Z',
  })
  @IsDateString({ message: 'Invalid date format. Please provide a valid date string.' })
  checkInTime: Date;

  @ApiProperty({
    description: 'Check-out time in date format (optional)',
    example: '2024-02-01T17:00:00Z',
    required: false,
  })
  @IsDateString({ message: 'Invalid date format. Please provide a valid date string.' })
  @IsOptional()
  checkOutTime?: Date;

  @ApiProperty({
    description: 'Check-in type (optional)',
    example: 'QR Code',
    required: false,
  })
  @IsOptional()
  checkInType?: string;

  @ApiProperty({
    description: 'Location hash (optional)',
    example: 'abc123',
    required: false,
  })
  @IsOptional()
  locationHash?: string;

  @ApiProperty({
    description: 'Entity ID (optional)',
    example: '123456',
    required: false,
  })
  @IsOptional()
  entityId?: string;

  @ApiProperty({
    description: 'Check-in hash (optional)',
    example: 'xyz789',
    required: false,
  })
  @IsOptional()
  checkInHash?: string;
}

export class UpdateAttendanceDto extends CreateAttendanceDto {}

export class CheckInDto extends CreateAttendanceDto {}

