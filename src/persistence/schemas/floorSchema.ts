import { IFloorPersistence } from '../../dataschema/IFloorPersistence';
import mongoose from 'mongoose';

const floorSchema = new mongoose.Schema(
  {

    domainId: { 
      type: String,
      unique: true
    },

    name: {
      type: String,
      required: [true, 'Floor name:'],
      maxlength: 5,
      match: /^[a-zA-Z0-9\s]*$/,
      index: true,
    },

    buildingName: {
      type: String,
      required: [true, 'Which building does this floor belong to?'],
      maxlength: 5,
      match: /^[a-zA-Z0-9\s]*$/,
      index: true,
    },

    description: {
      type: String,
      maxlength: 255,
      required: [true, 'Please enter the floor description'],
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', floorSchema);