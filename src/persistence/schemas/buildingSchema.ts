import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const buildingSchema = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },
    name: {
      type: String,
      unique: true,
      required: [true, 'The building name is required'],
      maxlength: 5,
      match: /^[A-Z0-9\s]*$/ 
    },

    description: {
      type: String,
      required: [true, 'The building description is required'],
      maxlength: 255
    },

    depth: {
      type: Number,
      //must be a number betwween 1 and 10
      min: 1,
      max: 10,
    },
    width: {
      type: Number,
      //must be a number betwween 1 and 10
      min: 1,
      max: 10,
    
      
    }
  },
  { timestamps: true },
);



export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', buildingSchema);

