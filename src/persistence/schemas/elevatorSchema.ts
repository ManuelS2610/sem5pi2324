import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';
import mongoose from 'mongoose';

const elevatorSchema = new mongoose.Schema(
  {

    domainId: { 
      type: String,
      unique: true
    },
    
    name: {
      type: String,
      maxlength: 5,
      match: /^[a-zA-Z0-9\s]*$/,
      index: true,
    },

    buildingName: {
      type: String,
      required: [true, 'Which building does this elevator belong to?'],
      maxlength: 5,
      match: /^[a-zA-Z0-9\s]*$/,
      index: true,
    },

  },
  { timestamps: true },
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', elevatorSchema);
