import { faker } from '@faker-js/faker';
import { PaymentInProject } from 'app/pages/ProjectPage/slice/types';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const payments: PaymentInProject[] = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  amount: +faker.finance.amount(10, 250),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  contractAddress: faker.finance.creditCardNumber(),
  createdAt: faker.date.past().toISOString().slice(0, 10),
  customerAddress: faker.finance.ethereumAddress(),
  transactionHash: sample([
    '0x53fce97a6e544699dedf697ae7e63cada4e7745dd7ac9b1d7661f922cba95d88',
    '0x0dc7b4965360f71a5bec530d48212053d499d5ea5d807b3f9cf3044d0cdf5a13',
    '0x2f863a5d0b8e41c1a9d7ed6dd29524c887086f443e8c5c2c143c9f2928860cfe',
    '0xe57e9096c096b224995b69985313c1308ce2298e92feae70ad55466d47808092',
    '0x14fba0a13b759d720ba1156eb8f167b583e35fa3cf6e63f639ddc7bb3fed0854',
    '0x708f9bf9920a9368e7d19a3cf61c19145e7555d329b1c5c58211e181c5177575',
    '0x213f1ba26e627261e406473abe61616a2d9c6aec0d786a58be462ece8abb8edf',
    '0xc7e0a88f81efc443da376e027a8441ebca91a5939b6e5a331b9d32c3b1221df0',
  ]),
  merchantAddress: faker.finance.ethereumAddress(),
  name: faker.person.fullName(),
  projectName: faker.company.name(),
  currency: sample(['ETH', 'USDT', 'SUI', 'BTC', 'SOL', 'BNB']),
  tokenAddress: faker.finance.ethereumAddress(),
}));

export default payments;
