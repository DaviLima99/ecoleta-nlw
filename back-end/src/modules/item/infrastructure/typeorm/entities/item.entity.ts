import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'title', type: 'text', nullable: false })
  title: string;

  @Column({ name: 'image_url', type: 'text', nullable: false })
  imageUrl: string;

  constructor(title: string, imageUrl: string) {
    this.title = title;
    this.imageUrl = imageUrl;
  }
}
