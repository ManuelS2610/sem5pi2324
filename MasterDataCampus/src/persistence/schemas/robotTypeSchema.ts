import { IRobotTypePersistence } from "../../dataschema/IRobotTypePersistence";
import mongoose from 'mongoose';

const RobotTypeSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String,enum:["Pick-Up&Delivery","Survaillance"]},
    robotDesignation: { type: String,enum:["Drone","Robot"] },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', RobotTypeSchema);