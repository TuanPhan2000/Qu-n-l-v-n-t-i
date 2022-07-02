import {Coach} from "./coach";
import {Route} from "./route";
import {Driver} from "./driver";

export class CoachTurn{
  id!: number;
  passengerAmount!: number;
  ticketPrice!: number;
  startTime!: String;
  endTime!: String; // "2000-10-10T17:00:00",
  gradeSalary!: number;
  coach!: Coach;
  route!: Route;
  driver!: Driver;
  driverAsistant!: Driver;
}
