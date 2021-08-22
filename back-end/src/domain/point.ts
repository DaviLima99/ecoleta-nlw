export class Point {
  id?: number;
  name: string;
  image: string;
  email: string;
  phone: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;

  constructor(
    name: string,
    image: string,
    email: string,
    phone: string,
    latitude: number,
    longitude: number,
    city: string,
    uf: string,
  ) {
    this.name = name;
    this.image = image;
    this.email = email;
    this.phone = phone;
    this.latitude = latitude;
    this.longitude = longitude;
    this.city = city;
    this.uf = uf;
  }
}
