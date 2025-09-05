import mongoose, {Model, Schema, Document} from "mongoose"

export interface  IUser extends Document{
    username:string,
    password:string,
    email:string,
}

const UserSchema = new Schema<IUser>({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String,required:true}
})
const UserModel :Model<IUser> = mongoose.models.user || mongoose.model<IUser>("user",UserSchema)

export default UserModel;