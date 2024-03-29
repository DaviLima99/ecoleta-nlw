import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Item } from '../../../../item/infrastructure/typeorm/entities/item.entity';

@Entity('points')
export class Point {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'image', type: 'text', nullable: false })
  image: string;

  @Column({ name: 'name', type: 'text', nullable: false })
  name: string;

  @Column({ name: 'email', type: 'text', nullable: false })
  email: string;

  @Column({ name: 'phone', type: 'text', nullable: false })
  phone: string;

  @Column({
    name: 'latitude',
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: false,
  })
  latitude: number;

  @Column({
    name: 'longitude',
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: false,
  })
  longitude: number;

  @Column({ name: 'city', type: 'text', nullable: false })
  city: string;

  @Column({ name: 'uf', type: 'text', width: 2, nullable: false })
  uf: string;

  @ManyToMany((type) => Item, {
    cascade: ['insert'],
  })
  @JoinTable({ name: 'points_items' })
  items: Item[];

  constructor(
    image: string,
    name: string,
    email: string,
    phone: string,
    latitude: number,
    longitude: number,
    city: string,
    uf: string,
    items: Item[],
  ) {
    this.image = image;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.latitude = latitude;
    this.longitude = longitude;
    this.city = city;
    this.uf = uf;
    this.items = items;
  }
}
