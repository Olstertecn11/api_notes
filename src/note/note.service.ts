import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Note } from './interfaces/note.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNoteDTO } from './dto/note.dto';



@Injectable()
export class NoteService {
    constructor(@InjectModel('Note') private readonly noteModel: Model<Note>){}
    
    async getNotes(): Promise<Note[]>{
	const notes = await this.noteModel.find();
	return notes;
    }

    async getNote(noteID: string): Promise<Note>{
	const note = await this.noteModel.findById(noteID);
	return note;
    }

    async createNote(createNoteDTO: CreateNoteDTO): Promise<Note>{
	const new_note =  new this.noteModel(createNoteDTO);
	return await new_note.save();
    }

    async updateNote(newNoteDTO: CreateNoteDTO, noteID:string): Promise<Note>{
	const update_note = await this.noteModel.findByIdAndUpdate(noteID, newNoteDTO, {new:true});
	return update_note;
    }

    async deleteNote(noteID:string): Promise<Note>{
	const deleted_note = await this.noteModel.findByIdAndDelete(noteID);
	return deleted_note;
    }

}
