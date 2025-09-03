import mongoose, {Schema, Model, Document} from "mongoose";


interface IMemeber extends Document{
    name:string,
    image?:string,
    role:string,
    band: mongoose.Types.ObjectId;
}

const MemberSchema = new Schema<IMemeber>({
    name:{type:String, requried:true},
    image:{type:String},
    role:{type:String},
    band: { type: Schema.Types.ObjectId, ref: "Band", required: true },

})

const MemberModel: Model<IMemeber> = mongoose.models.Member || mongoose.model<IMemeber>("Member", MemberSchema);
export default MemberModel;