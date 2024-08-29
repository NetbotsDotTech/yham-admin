import asyncHandler from 'express-async-handler';
import Artifact from '../models/artifactModel.js';
import { uploadFileToS3, generateQRCode } from '../utils/s3Utils.js';

// Create Artifact
export const createArtifact = asyncHandler(async (req, res) => {
  console.log("Create Artifact Api Trigerred")
  try {
    const { name, itemNo, serialNo, description, madeOf, particulars, age, shelfNo, hallNo } = req.body;

    // Check if an artifact with the same item number already exists
    const artifactExists = await Artifact.findOne({ itemNo });
    if (artifactExists) {
      return res.status(400).json({
        success: false,
        message: 'Artifact with this item number already exists',
      });
    }

    // Generate QR code
    const qrCodeUrl = await generateQRCode({ name, itemNo, serialNo, description, });
    console.log("Step 1: QR Code generated", qrCodeUrl);

    // Get image URLs from the files uploaded via the uploadImages middleware
    const imageUrls = req.files['images'] ? req.files['images'].map(file => file.location) : [];
    console.log("Step 2: Images uploaded to S3", imageUrls);

    // Get audio URL from the file uploaded via the uploadAudio middleware
    let audioUrl = '';
    if (req.files['audio'] && req.files['audio'][0] && req.files['audio'][0].location) {
      audioUrl = req.files['audio'][0].location;
      console.log("Step 3: Audio uploaded to S3", audioUrl);
    }

    // Create the artifact document
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
      audio: audioUrl,
      images: imageUrls,
      qrCode: qrCodeUrl,
    });

    // Save the artifact to the database
    const createdArtifact = await artifact.save();
    console.log("Step 4: Artifact saved to DB", createdArtifact);

    // Respond with the created artifact
    res.status(201).json({
      success: true,
      message: 'Artifact created successfully',
      data: createdArtifact,
    });
  } catch (error) {
    console.error('Error creating artifact:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the artifact',
      error: error.message,
    });
  }
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
