import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoteService } from '../shared/note.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.css']
})
export class NoteNewComponent implements OnInit {
  @ViewChild('f', {static: true}) noteForm: NgForm;
  contentSaved = false;
  noteContent = {
    title: '',
    date: '',
    body: '',
  };

  constructor(private noteService: NoteService) { }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.contentSaved && (this.noteForm.value.title !== '' || this.noteContent.body !== '')) {
      return confirm('Leave page without saving changes?');
    } else {
      return true;
    }
  }

  ngOnInit() {
  }

  // add note from user input in note editor
  addNote() {
    this.contentSaved = true;
    this.noteContent.title = this.noteForm.value.title;
    if (this.noteContent.title === '') {
      this.noteContent.title = 'Untitled';
    }
    this.noteContent.date = new Date().toString();
    this.noteContent.body = this.noteForm.value.body;
    this.noteService.addNote(this.noteContent);
  }
}
