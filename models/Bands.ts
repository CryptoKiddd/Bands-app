import mongoose, {Model, Schema, Document } from 'mongoose';

interface IBand extends Document {
    name:String,
    genre?:String,
    description?:String,
    image?:String,
}
const BandSchema = new Schema<IBand>({
    name:{type:String, required:true},
    genre:{type:String},
    description:{type:String},
    image:{type:String},
},{timestamps:true});

const Band: Model<IBand> = mongoose.models.Band || mongoose.model<IBand>('Band', BandSchema);
export default Band;