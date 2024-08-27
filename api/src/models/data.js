import Artifact from './models/artifact.js'; // Assuming the schema is stored in a file named artifact.js

const dummyArtifacts = [
  {
    name: 'Ancient Pottery Vase',
    itemNo: 'GB-001',
    serialNo: 'SN-001',
    description: 'An ancient pottery vase from the 2nd century, discovered in the Hunza Valley.',
    madeOf: 'Clay',
    particulars: {
      width: 15,
      depth: 20,
      circumference: 50,
      diameters: 25,
      weight: 2.5,
    },
    age: '2000 years',
    shelfNo: 'S-01',
    hallNo: 'H-01',
    audioUrl: 'https://s3.amazonaws.com/museum-artifacts/GB-001/audio.mp3',
    images: [
      'https://s3.amazonaws.com/museum-artifacts/GB-001/image1.jpg',
      'https://s3.amazonaws.com/museum-artifacts/GB-001/image2.jpg',
      'https://s3.amazonaws.com/museum-artifacts/GB-001/image3.jpg',
    ],
    qrCodeUrl: 'https://s3.amazonaws.com/museum-artifacts/GB-001/qrcode.png',
  },
  {
    name: 'Rock Carving of Buddha',
    itemNo: 'GB-002',
    serialNo: 'SN-002',
    description: 'A well-preserved rock carving of Buddha from the 4th century, located near Skardu.',
    madeOf: 'Stone',
    particulars: {
      width: 100,
      depth: 40,
      circumference: 300,
      diameters: 120,
      weight: 200,
    },
    age: '1600 years',
    shelfNo: 'S-02',
    hallNo: 'H-02',
    audioUrl: 'https://s3.amazonaws.com/museum-artifacts/GB-002/audio.mp3',
    images: [
      'https://s3.amazonaws.com/museum-artifacts/GB-002/image1.jpg',
      'https://s3.amazonaws.com/museum-artifacts/GB-002/image2.jpg',
      'https://s3.amazonaws.com/museum-artifacts/GB-002/image3.jpg',
    ],
    qrCodeUrl: 'https://s3.amazonaws.com/museum-artifacts/GB-002/qrcode.png',
  },
  {
    name: 'Baltit Fort Sword',
    itemNo: 'GB-003',
    serialNo: 'SN-003',
    description: 'A ceremonial sword from Baltit Fort, dating back to the 15th century.',
    madeOf: 'Steel and Gold',
    particulars: {
      width: 5,
      depth: 1,
      circumference: 0,
      diameters: 0,
      weight: 1.5,
    },
    age: '600 years',
    shelfNo: 'S-03',
    hallNo: 'H-03',
    audioUrl: 'https://s3.amazonaws.com/museum-artifacts/GB-003/audio.mp3',
    images: [
      'https://s3.amazonaws.com/museum-artifacts/GB-003/image1.jpg',
      'https://s3.amazonaws.com/museum-artifacts/GB-003/image2.jpg',
      'https://s3.amazonaws.com/museum-artifacts/GB-003/image3.jpg',
    ],
    qrCodeUrl: 'https://s3.amazonaws.com/museum-artifacts/GB-003/qrcode.png',
  },
];

// Example function to save these artifacts to the database
async function seedArtifacts() {
  try {
    await Artifact.insertMany(dummyArtifacts);
    console.log('Artifacts seeded successfully.');
  } catch (error) {
    console.error('Error seeding artifacts:', error);
  }
}

seedArtifacts();
