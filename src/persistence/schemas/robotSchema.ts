import mongoose from 'mongoose';
import { IRobotPersistence } from '../../dataschema/IRobotPersistence';

const robotSchema = new mongoose.Schema(
  {

    domainId: { 
      type: String,
      unique: true
    },

    type: {
      type: String,
      required: [true, 'Robot type:'],
      index: true,
    },

    designation: {
      type: String,
      maxlength: 255,
      required: [true, 'Please enter the robot designation'],
      unique: true,
      index: true,
    },

    serialNumber: {
      type: String,
      maxlength: 9,
      required: [true, 'Please enter the robot serial number'],
      unique: true,
      index: true,
    },

    description: {
      type: String,
      maxlength: 255,
      required: [true, 'Please enter the robot description'],
      index: true,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', robotSchema);
