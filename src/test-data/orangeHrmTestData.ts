import { faker } from "@faker-js/faker";

export const EmployeeDetails = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  id: faker.string.numeric(8),
};

export const VacancyDetails = {
  name: faker.person.jobTitle(),
  jobTitle: "Automaton Tester",
};

export const CustomerDetails = {
  name: faker.person.fullName(),
};

export const ProjectDetails = {
  name: faker.commerce.productName(),
};
