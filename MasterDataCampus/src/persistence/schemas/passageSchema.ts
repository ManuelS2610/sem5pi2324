import { IPassagePersistence } from '../../dataschema/IPassagePersistence';
import mongoose from 'mongoose';

const passageSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      index: true,
    },
    building1: {
      type: String,
      index: true,
    },
    building2: {
      type: String,
      index: true,
    },
    pisobuilding1: {
      type: String,
      index: true,
    },
    pisobuilding2: {
      type: String,
      index: true,
    },
    positionBuilding1: {
      type: [Number],
      index: true,
    },
    positionBuilding2: {
      type: [Number],
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPassagePersistence & mongoose.Document>('Passage', passageSchema);;