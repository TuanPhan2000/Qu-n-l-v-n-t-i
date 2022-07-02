import { FixedSalary } from "./fixed-salary";

export class Driver{
  id!: number;
  name!: String;
  idCard!: String;
  drivingLicenseCode!: String;
  typeOfLicense!: String;
  address!: String;
  birthday!: Date;
  experience!: number;
  fixedSalary!:FixedSalary;
}
