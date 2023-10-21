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
      unique: true
    },

    description: {
      type: String,
     
      
    },

    depth: {
      type: Number,
      //must be a number betwween 1 and 10
      
     
    },
    width: {
      type: Number,
      //must be a number betwween 1 and 10
    
      
    },
  },
  { timestamps: true },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', buildingSchema);

