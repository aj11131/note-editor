import { Component, OnInit } from '@angular/core';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private noteService: NoteService) {  }

  ngOnInit() {}

  confirmDelete() {
    if(confirm('Are you sure you want to delete all notes?')){
      this.noteService.deleteAllNotes();
    }
  }

  setDemoNotes() {
    this.noteService.setDemoNotes();
  }

}