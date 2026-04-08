import { faker } from "@faker-js/faker";

export const EmployeeDetails = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  id: faker.airline.flightNumber(),
};
