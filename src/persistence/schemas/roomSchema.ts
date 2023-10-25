import { IRoomPersistence } from "../../dataschema/IRoomPersistence";
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {

    domainId: { 
      type: String,
      unique: true
    },

    category: {
      type: String,
      required: [true, 'Room category:'],
      maxlength: 10,
      match: /^[a-zA-Z0-9\s]*$/,
      index: true,
    },

    description: {
      type: String,
      maxlength: 255,
      required: [true, 'Please enter the room description'],
      index: true,
    },

    floor: {
      type: String,
      default: 'No Floor',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', roomSchema);