import { faker } from '@faker-js/faker';
import { Project } from 'app/pages/ProjectPage/slice/types';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const projects: Project[] = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  // avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  avatarUrl: faker.image.url(),
  projectName: faker.company.name(),
  email: faker.internet.email(),
  noTransaction: faker.finance.amount(20, 150, 0),
  // type: faker.finance.currencySymbol(),
  type: sample(['Payment', 'Subscribe']),
  createdAt: faker.date.past().toISOString().slice(0, 10),
  totalEarned: faker.finance.amount(1000, 5000, 0),
}));

export default projects;
