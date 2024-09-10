import mongoose from 'mongoose';

const qrCodePdfSchema = new mongoose.Schema({
  itemNo: { type: String },
  hallNo: { type: String },
  shelfNo: { type: String },
  qrCodePdf: { type: String, required: true },
}, {
  timestamps: true,
});

const QRCodePdf = mongoose.model('QRCodePdf', qrCodePdfSchema);
export default QRCodePdf;
