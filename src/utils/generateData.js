import { faker } from '@faker-js/faker';

const generateData = (count = 10) => {
  const data = [];

  for (let i = 0; i < count; i++) {
    data.push({
      id: faker.datatype.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      role: faker.name.jobTitle(),
      email: faker.internet.email(),
      status: faker.helpers.arrayElement(['Active', 'Inactive']),
      teams: faker.helpers.arrayElements(
        ['Engineering', 'Marketing', 'Sales', 'Support'],
        faker.datatype.number({ min: 1, max: 3 })
      ),
    });
  }

  return data;
};

export default generateData;
