export class Item {
  id: number;
  title: string;
  imageUrl: string;

  constructor(id: number, title: string, imageUrl: string) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
  }
}
