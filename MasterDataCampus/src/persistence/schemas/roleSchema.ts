import { IRolePersistence } from '../../dataschema/IRolePersistence';
import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String,enum: ['admin', 'gestorDeFrota','gestorDeCampus','estudante']}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRolePersistence & mongoose.Document>('Role', RoleSchema);
