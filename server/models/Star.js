import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const StarsSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    size: {type: String, required: true},
    creatorId: {type: ObjectId, required:true}
},
{ timestamps: true, toJSON: { virtuals: true } }
)

StarsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})