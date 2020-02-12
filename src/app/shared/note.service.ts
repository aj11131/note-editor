import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { Subject } from 'rxjs';
import { demoNotes } from './demo-notes';

@Injectable()
export class NoteService {
  searchContents = new Subject<string>();
  notes: Note[];
  demo = demoNotes;
  constructor() { }

  initializeNotes() {
    if (localStorage.getItem('notes') == null){
      this.notes = [];
    } else {
      this.notes = JSON.parse(localStorage.getItem('notes'));
    }
  }

  getNote(index: number) {
    return this.notes[index];
  }

  getNotes() {
    return this.notes.slice();
  }

  addNote(noteContent: Note){
    this.notes.unshift(
      new Note (noteContent.title, noteContent.date, noteContent.body)
    );
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  setDemoNotes() {
    demoNotes.forEach(note => this.notes.push(note));
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
  }

  deleteAllNotes() {
    localStorage.clear();
    this.notes = [];
  }

  editNote(dataArr) {
    this.notes[dataArr[0]] = dataArr[1];
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

}
