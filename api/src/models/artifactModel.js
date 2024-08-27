import mongoose from 'mongoose';

const artifactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  itemNo: { type: String, required: true, unique: true },
  serialNo: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  madeOf: { type: String, required: true },
  particulars: {
    width: { type: Number },
    depth: { type: Number },
    circumference: { type: Number },
    diameters: { type: Number },
    weight: { type: Number },
  },
  age: { type: String, required: true },
  shelfNo: { type: String, required: true },
  hallNo: { type: String, required: true },
  audio: { type: String,  },
  images: [{ type: String,  }],
  qrCode: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Artifact = mongoose.model('Artifact', artifactSchema);

export default Artifact;
