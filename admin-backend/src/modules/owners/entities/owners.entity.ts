import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductsEntity } from '../../products/entities/products.entity';

@Entity('owners')
export class OwnersEntity {
  @ApiProperty({
    example: 'f63ced85-eb65-41e3-b7e4-51fad206528f',
    description: 'Unique ID (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the owner',
  })
  @IsString()
  @Column()
  name: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'Username of the owner',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  username?: string;

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

  @OneToMany(() => ProductsEntity, (product) => product.owner)
  products: ProductsEntity[];
}
