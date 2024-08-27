import asyncHandler from 'express-async-handler';
import Artifact from '../models/artifactModel.js';
import { uploadFileToS3, generateQRCode } from '../utils/s3Utils.js';

// Create Artifact
export const createArtifact = asyncHandler(async (req, res) => {
  const { name, itemNo, serialNo, description, madeOf, particulars, age, shelfNo, hallNo } = req.body;

  const artifactExists = await Artifact.findOne({ itemNo });
  if (artifactExists) {
    res.status(400);
    throw new Error('Artifact with this item number already exists');
  }

  const qrCodeUrl = await generateQRCode({ itemNo, name, description });

  const imageUrls = await Promise.all(req.files.images.map(async (file) => {
    return await uploadFileToS3(file, name, 'images');
  }));

  const artifact = new Artifact({
    name,
    itemNo,
    serialNo,
    description,
    madeOf,
    particulars,
    age,
    shelfNo,
    hallNo,
    audioUrl: req.body.audioUrl,
    images: imageUrls,
    qrCodeUrl,
  });

  const createdArtifact = await artifact.save();
  res.status(201).json(createdArtifact);
});

// Get all Artifacts
export const getArtifacts = asyncHandler(async (req, res) => {
  const artifacts = await Artifact.find({});
  res.status(200).json(artifacts);
});

// Get Artifact by ID
export const getArtifactById = asyncHandler(async (req, res) => {
  const artifact = await Artifact.findById(req.params.id);
  if (!artifact) {
    res.status(404);
    throw new Error('Artifact not found');
  }
  res.status(200).json(artifact);
});

// Update Artifact
export const updateArtifact = asyncHandler(async (req, res) => {
  const { name, itemNo, serialNo, description, madeOf, particulars, age, shelfNo, hallNo } = req.body;

  const artifact = await Artifact.findById(req.params.id);
  if (!artifact) {
    res.status(404);
    throw new Error('Artifact not found');
  }

  if (itemNo && itemNo !== artifact.itemNo) {
    const artifactExists = await Artifact.findOne({ itemNo });
    if (artifactExists) {
      res.status(400);
      throw new Error('Artifact with this item number already exists');
    }
  }

  const qrCodeUrl = await generateQRCode({ itemNo, name, description });

  const imageUrls = req.files?.images ? await Promise.all(req.files.images.map(async (file) => {
    return await uploadFileToS3(file, name, 'images');
  })) : artifact.images;

  artifact.name = name || artifact.name;
  artifact.itemNo = itemNo || artifact.itemNo;
  artifact.serialNo = serialNo || artifact.serialNo;
  artifact.description = description || artifact.description;
  artifact.madeOf = madeOf || artifact.madeOf;
  artifact.particulars = particulars || artifact.particulars;
  artifact.age = age || artifact.age;
  artifact.shelfNo = shelfNo || artifact.shelfNo;
  artifact.hallNo = hallNo || artifact.hallNo;
  artifact.audioUrl = req.body.audioUrl || artifact.audioUrl;
  artifact.images = imageUrls.length ? imageUrls : artifact.images;
  artifact.qrCodeUrl = qrCodeUrl || artifact.qrCodeUrl;

  const updatedArtifact = await artifact.save();
  res.status(200).json(updatedArtifact);
});

// Delete Artifact
export const deleteArtifact = asyncHandler(async (req, res) => {
  const artifact = await Artifact.findById(req.params.id);
  if (!artifact) {
    res.status(404);
    throw new Error('Artifact not found');
  }

  // Delete images and audio from S3
  await Promise.all([
    ...artifact.images.map(imageUrl => deleteFileFromS3(imageUrl)),
    deleteFileFromS3(artifact.audioUrl),
    deleteFileFromS3(artifact.qrCodeUrl)
  ]);

  await artifact.remove();
  res.status(204).json({ message: 'Artifact removed' });
});
