import mongoose, { Model, Schema, Document } from "mongoose";

export interface IBand extends Document {
  name: string;
  genre?: string;
  description?: string;
  image?: string;
}

const BandSchema = new Schema<IBand>(
  {
    name: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const BandModel: Model<IBand> =
  mongoose.models.Band || mongoose.model<IBand>("Band", BandSchema);

export default BandModel;
