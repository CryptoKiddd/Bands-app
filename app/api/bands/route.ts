import {Model, Schema, Document } from 'mongoose';

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
})