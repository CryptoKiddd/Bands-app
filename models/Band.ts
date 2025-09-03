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

const BandModel: Model<IBand> = mongoose.models.BandModel || mongoose.model<IBand>('BandModel', BandSchema);
export default BandModel;