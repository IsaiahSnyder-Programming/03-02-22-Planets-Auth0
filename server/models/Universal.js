import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const UniversalSchema = new Schema({
    galaxyId: {type: ObjectId, required: true, ref: 'Galaxy'},
    starId: {type: ObjectId, required: true, ref: 'Star'},
    creatorId: {type: ObjectId, required: true, ref: 'Account'}
},
{timestamps: true, toJSON: {virtuals: true}}
)

UniversalSchema.virtual('galaxy', {
    localField: 'galaxyId',
    foreignField: '_id',
    justOne: true,
    ref: 'Galaxy'
})

UniversalSchema.virtual('star', {
    localField: 'starId',
    foreignField: '_id',
    justOne: true,
    ref: 'Star'
})