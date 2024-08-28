/* eslint-disable prettier/prettier */

import IMG from '../../../public/img1.png';
import IMG2 from '../../../public/img1.png';
import IMG3 from '../../../public/img1.png';
import QRCODE from '../../../public/qrcode.png';
import AUDIO from '../../../public/audio.m4a';

const fakeData = [
  {
    id: 'x0y9q1r7',
    name: 'Artifact 1',
    itemNo: 'ITEM1234',
    serialNo: 'SERIAL5678',
    description: 'Description for artifact 1',
    madeOf: 'Material 3',
    particulars: {
      width: 45,
      depth: 30,
      circumference: 123,
      diameters: 20,
      weight: 12
    },
    age: '25 years',
    shelfNo: 'SHELF7',
    hallNo: 'HALL3',
    audio: AUDIO,
    images: [IMG, IMG, IMG],
    qrCode: IMG
  },
  {
    id: 'x0y9q1r7',
    name: 'Artifact 1',
    itemNo: 'ITEM1234',
    serialNo: 'SERIAL5678',
    description: 'Description for artifact 1',
    madeOf: 'Material 3',
    particulars: {
      width: 45,
      depth: 30,
      circumference: 123,
      diameters: 20,
      weight: 12
    },
    age: '25 years',
    shelfNo: 'SHELF7',
    hallNo: 'HALL3',
    audio: '/public/audio.m4a',
    images: [IMG3, IMG3, IMG3],
    qrCode: IMG
  },
  {
    id: 'x0y9q1r7',
    name: 'Artifact 1',
    itemNo: 'ITEM1234',
    serialNo: 'SERIAL5678',
    description: 'Description for artifact 1',
    madeOf: 'Material 3',
    particulars: {
      width: 45,
      depth: 30,
      circumference: 123,
      diameters: 20,
      weight: 12
    },
    age: '25 years',
    shelfNo: 'SHELF7',
    hallNo: 'HALL3',
    audio: AUDIO,
    images: [IMG2, IMG2, IMG2],
    qrCode: IMG
  }
];

export { fakeData };
