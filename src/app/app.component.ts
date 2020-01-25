import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from './shared/note.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit { 
  constructor(private noteService: NoteService) {}

  ngOnInit(){
    this.noteService.initializeNotes();
  }
}
