import { PDFDocument, rgb } from 'pdf-lib';
import QRCode from 'qrcode';
import asyncHandler from 'express-async-handler';
import { uploadPdf } from '../utils/multer.js'; // Utility function to upload PDF
import Artifact from '../models/artifactModel.js';
import QRCodePdf from '../models/qrCodePdf.js'; // New Model

export const generateQrCodePdf = asyncHandler(async (req, res) => {
  try {
    // Fetch all artifacts
    const artifacts = await Artifact.find({}, 'qrCode itemNo hallNo shelfNo');

    if (artifacts.length === 0) {
      return res.status(404).send('No artifacts found.');
    }

    console.log('Generating QR Code PDF for', artifacts.length, 'artifacts');

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595.28, 841.89]); // A4 page size in points

    const itemsPerRow = 4;
    const qrCodeSize = 100;
    const margin = 50;
    const spacing = 20;

    let x = margin;
    let y = page.getHeight() - margin - qrCodeSize; // Start from top

    for (let [index, artifact] of artifacts.entries()) {
      if (index % itemsPerRow === 0 && index !== 0) {
        x = margin;
        y -= qrCodeSize + spacing;
      }

      if (y < margin) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = page.getHeight() - margin - qrCodeSize;
      }

      const qrImageDataURL = await QRCode.toDataURL(artifact.qrCode);
      const qrImage = await pdfDoc.embedPng(qrImageDataURL);

      page.drawImage(qrImage, {
        x,
        y,
        width: qrCodeSize,
        height: qrCodeSize,
      });

      console.log(`Adding QR Code for ${artifact.itemNo || ''} to PDF`);

      page.drawText(artifact.itemNo || '', {
        x: x + (qrCodeSize / 2) - ((artifact.itemNo || '').length * 5),
        y: y - 18,
        size: 15,
        color: rgb(0, 0, 0),
      });

      x += qrCodeSize + spacing;
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);
console.log('PDF generated successfully');
    // Determine the type of record for naming
    const firstArtifact = artifacts[0];
    const recordType = firstArtifact.shelfNo
      ? `Shelf_${firstArtifact.shelfNo}`
      : firstArtifact.hallNo
      ? `Hall_${firstArtifact.hallNo}`
      : firstArtifact.itemNo
      ? `Item_${firstArtifact.itemNo}`
      : 'AllRecords';

    const artifactName = `QRCodeCollection_${recordType}_${Date.now()}.pdf`;
    console.log('PDF name:', artifactName);
    const pdfUrl = await uploadPdf(pdfBuffer, artifactName);
console.log('PDF uploaded successfully');
    // Save PDF details in the new QRCodePdf model
    for (const artifact of artifacts) {
      const qrCodePdfRecord = new QRCodePdf({
        itemNo: artifact.itemNo || '',
        hallNo: artifact.hallNo || '',
        shelfNo: artifact.shelfNo || '',
        qrCodePdf: pdfUrl,
      });
      
      await qrCodePdfRecord.save();
    }
    console.log('QR Code PDF details saved successfully');

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Content-Disposition', `attachment; filename=${artifactName}`);
    res.status(200).json({ message: 'QR Code PDF generated and uploaded successfully.' });

  } catch (error) {
    console.error('Error generating QR Code PDF:', error);
    res.status(500).send('Server error');
  }
});




