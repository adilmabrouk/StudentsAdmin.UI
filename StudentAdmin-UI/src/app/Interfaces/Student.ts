import { Address } from './Address';
import { Gender } from './Gender';
export interface Student
{
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  mobile: number,
  profileImageUrl: string,
  genderId: string
  gender: Gender,
  address: Address
}
