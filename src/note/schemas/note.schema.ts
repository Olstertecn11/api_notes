import { Schema } from "mongoose";



export const NoteSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    status: Boolean
});
