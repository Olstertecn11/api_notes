import { 
    Controller, 
    Get, 
    Post, 
    Delete, 
    Param , 
    Put, 
    Res, 
    HttpStatus, 
    Body, 
    NotFoundException} from '@nestjs/common';
import { CreateNoteDTO } from './dto/note.dto';
import { NoteService } from './note.service';


@Controller('note')
export class NoteController {

    constructor(private noteService: NoteService){
	
    }


    @Post('/create')
    async cratePost(@Res() res: any, @Body() createNoteDTO : CreateNoteDTO){
	const note = await this.noteService.createNote(createNoteDTO);

	return res.status(HttpStatus.OK).json({
	    message: 'Succesfully created',
	    note
	});
    }
    
    @Get('/')
    async getNotes(@Res() res:any){
	const notes = await this.noteService.getNotes();
	return res.status(HttpStatus.OK).json({
	    message: 'Notes',
	    notes
	});
    }

    @Get('/:noteID')
    async getNote(@Res() res:any, @Param('noteID') noteID:string){
	const note = await this.noteService.getNote(noteID);
	if(!note) throw new NotFoundException('Note Does not exist');
	return res.status(HttpStatus.OK).json(note);
    }

    @Delete('/:noteID')
    async deleteNote(@Res() res:any, @Param('noteID') noteID:string){
	const deletedNote = await this.noteService.deleteNote(noteID);
	if(!deletedNote) throw new NotFoundException('Note Does not exist');
	return res.status(HttpStatus.OK).json({
	    message: 'Note Deleted!',
	    deletedNote
	});
    }


    @Put('/update/:noteID')
    async updateNote(@Res() res:any, @Param('noteID') noteID:string, @Body() newNote: CreateNoteDTO){
	const updatedNote = await this.noteService.updateNote(newNote, noteID);
	if(!updatedNote) throw new NotFoundException('Note Does not exist');
	return res.status(HttpStatus.OK).json({
	    message: 'Note Updated',
	    updatedNote
	});
    }

}

