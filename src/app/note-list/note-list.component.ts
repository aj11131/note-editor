import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @ViewChild('emptyMessage', {static: true}) emptyMessage: ElementRef;
  notes: Note[];
  notesFilter: Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.notes = this.noteService.getNotes();
    this.noteService.searchContents.subscribe(
      // tslint:disable-next-line: max-line-length
      value => this.notes = this.noteService.getNotes().filter(element => element.body.toLowerCase().includes(value.toLowerCase()) || element.title.toLowerCase().includes(value.toLowerCase()))
    );
    if (this.notes.length === 0) {
      this.emptyMessage.nativeElement.style.display = 'block';
    } else {
      this.emptyMessage.nativeElement.style.display = 'none';
    }
  }
}
