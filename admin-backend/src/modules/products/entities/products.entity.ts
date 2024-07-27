import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { OwnersEntity } from '../../owners/entities/owners.entity';
import { AvailabilityEntity } from '../../availability/entities/availability.entity';

@Entity('products')
export class ProductsEntity {
  @ApiProperty({
    example: 'f63ced85-eb65-41e3-b7e4-51fad206528f',
    description: 'Unique ID (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'A product description',
    description: 'Description of the product',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    example: '123 Main St, Springfield, IL',
    description: 'Address of the product',
  })
  @IsString()
  @Column()
  address: string;

  @ApiProperty({
    example: '{ "lat": 40.712776, "lng": -74.005974 }',
    description: 'Location from map',
  })
  @IsString()
  @Column()
  location_from_map: string;

  @ApiProperty({
    example: 'https://cloud.example.com/media/12345',
    description: 'Link to media cloud',
  })
  @IsString()
  @Column()
  link_to_media_cloud: string;

  @ApiProperty({
    example: 'https://calendar.example.com/event/12345',
    description: 'Link to calendar',
  })
  @IsString()
  @Column()
  link_to_calendar: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'Category of the product',
  })
  @IsString()
  @Column()
  category: string;

  @ApiProperty({
    example: 'f63ced85-eb65-41e3-b7e4-51fad206528f',
    description: 'Owner ID of the product',
  })
  @ManyToOne(() => OwnersEntity, (owner) => owner.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: OwnersEntity;

  @OneToMany(() => AvailabilityEntity, (availability) => availability.product)
  availabilities: AvailabilityEntity[];

  @ApiProperty({
    example: '2023-07-27T12:34:56.000Z',
    description: 'Creation timestamp',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    example: '2023-07-27T12:34:56.000Z',
    description: 'Last update timestamp',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
