import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;

  @Exclude()
  password: string;

  //@Expose({ name: 'Country' })
  @Exclude()
  country: string;

  @Expose({
    name: 'Country',
    //groups: ['admin'],
  })
  getCountry() {
    return this.country;
  }

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
