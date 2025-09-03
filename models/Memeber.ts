import mongoose, {Schema, Model, Document} from "mongoose";


interface IMemeber extends Document{
    name:String,
    image?:String,
    role:string
}

const MemberSchema = new Schema<IMemeber>({
    name:{type:String, requried:true},
    image:{type:String},
    role:{type:String},

})

const MemberModel: Model<IMemeber> = mongoose.models.MemberModel || mongoose.model<IMemeber>("MemberModel", MemberSchema);
export default MemberModel;