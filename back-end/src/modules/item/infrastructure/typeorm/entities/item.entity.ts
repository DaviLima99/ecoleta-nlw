import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'item' })
export class ItemEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'title', type: 'text', nullable: false })
  title: string;

  @Column({ name: 'image_url', type: 'text', nullable: false })
  imageUrl: string;
}
