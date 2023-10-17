import { IFloorPersistence } from '../../dataschema/IFloorPersistence';
import mongoose from 'mongoose';

const floor = new mongoose.Schema(
  {
    floorId: {
      type: String,
      maxlength: 5,
      match: /^[a-zA-Z0-9\s]*$/,
      index: true,
    },

    buildingId: {
      type: String,
      required: [true, 'Please enter the building id which this floor belongs to'],
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

const FloorModel = mongoose.model<IFloorPersistence>('Floor', floor);

export default FloorModel;
