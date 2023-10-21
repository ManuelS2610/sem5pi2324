import { IPassagePersistence } from '../../dataschema/IPassagePersistence';
import mongoose from 'mongoose';

const passageSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
    },
    building1: {
      type: String,

    },
    building2: {
      type: String,

    },
    pisobuilding1: {
      type: String,
    },
    pisobuilding2: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPassagePersistence & mongoose.Document>('Passage', passageSchema);;