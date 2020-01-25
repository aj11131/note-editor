import { Component, OnInit } from '@angular/core';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Note[];
  notesFilter: Note[];

  constructor(private noteService: NoteService) { }

  //subscribe to the searchContents Subject in noteSerive. If input is detected the note array will be filtered to only those that contain the
  ngOnInit() {
    this.notes = this.noteService.getNotes();
    this.noteService.searchContents.subscribe(
      value => this.notes = this.noteService.getNotes().filter(element => element.body.toLowerCase().includes(value.toLowerCase()) || element.title.toLowerCase().includes(value.toLowerCase()))
    )     
  }
}