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
// Not storing the members in the bands list
// to not update bands everytime person is leaivng ar joining band 
// just letting mongoose to compute it
BandSchema.virtual("members", {
  ref: "Member",       
  localField: "_id",   
  foreignField: "band"
});

/////////// To ensure virtuals appear in JSON output //////////////////
BandSchema.set("toJSON", { virtuals: true });
BandSchema.set("toObject", { virtuals: true });
const BandModel: Model<IBand> =
  mongoose.models.Band || mongoose.model<IBand>("Band", BandSchema);

export default BandModel;
