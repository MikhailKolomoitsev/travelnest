import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsUUID } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductsEntity } from '../../products/entities/products.entity';

@Entity('availability')
export class AvailabilityEntity {
  @ApiProperty({
    example: 'f63ced85-eb65-41e3-b7e4-51fad206528f',
    description: 'Unique ID (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'f63ced85-eb65-41e3-b7e4-51fad206528f',
    description: 'Product ID',
  })
  @IsUUID()
  @ManyToOne(() => ProductsEntity, (product) => product.availabilities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntity;

  @ApiProperty({
    example: 100,
    description: 'Quantity available',
  })
  @IsInt()
  @Column()
  quantity: number;

  @ApiProperty({
    example: '2023-07-27T12:34:56.000Z',
    description: 'Date of availability',
  })
  @IsDate()
  @Column({ type: 'date' })
  date: Date;
}
