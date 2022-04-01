import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [NoteModule, MongooseModule.forRoot('mongodb://localhost/notes')],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
