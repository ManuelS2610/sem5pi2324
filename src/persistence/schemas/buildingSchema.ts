import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const building = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      match: /^[a-zA-Z0-9\s]*$/,
      index: true,
    },

    buildingId: {
      type: String,
      required: [true, 'Please enter building id'],
      maxlength: 5,
      match: /^[a-zA-Z0-9\s]*$/,
      index: true,
    },

    description: {
      type: String,
      maxlength: 255,
      required: [true, 'Please enter building description'],
      index: true,
    },
  },
  { timestamps: true },
);

const BuildingModel = mongoose.model<IBuildingPersistence>('Building', building);

export default BuildingModel;
