export class GetItemResponseDto {
  id: number;
  title: string;
  image_url: string;

  constructor(id: number, title: string, imageUrl: string) {
    this.id = id;
    this.title = title;
    this.image_url = imageUrl;
  }
}
