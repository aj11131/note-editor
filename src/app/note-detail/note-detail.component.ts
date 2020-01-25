import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { TextareaAutoGrowDirective } from '../shared/textarea-auto-grow.directive';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  @ViewChild('f', {static:true}) noteForm: NgForm;
  @ViewChild('titleInput', {static:true}) titleInput: ElementRef;
  @ViewChild('bodyInput', {static:true}) bodyInput: ElementRef;
  id: number;
  note: Note;
  preEditNote: Note = new Note('','','');
  editMode = false;
  

  constructor(private noteService: NoteService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.note = this.noteService.getNote(this.id);
  }

  // if user trys to exit the noteDetail page without saving changes, the canDeactivate guard will give the user a prompt
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.editMode && (this.note.title != this.titleInput.nativeElement.value || this.note.body != this.bodyInput.nativeElement.value)){
      return confirm('Leave page without saving changes?');
    } else {
      return true;
    }
  }

  // put the note detail screen into 'edit' mode 
  editNote(e){
    this.editMode = true;
    this.preEditNote.title = this.noteForm.value.title;
    this.preEditNote.body = this.noteForm.value.body;    
  }

  // call delete note and pass the index of the note to be deleted
  deleteNote(){
    if(confirm('Are you sure you want to delete this note?')){
          this.noteService.deleteNote(this.id);
          this.router.navigate(['../']);
    }
  }


  // exit edit mode without saving changes to the note
  cancelEdit() {
    this.note.title = this.preEditNote.title;
    this.note.body = this.preEditNote.body;
    this.editMode = !this.editMode;
    this.noteService.editNote([this.id, this.note]);
  }

  // Save note on every user input
  saveEditOnInput() {
    this.note.title = this.noteForm.value.title;
    this.note.body = this.noteForm.value.body;
    this.noteService.editNote([this.id, this.note]);
  }

  // exit edit mode and save changes by passing the id and the new note contents to the note service
  saveEditOnButtonClick() {
    this.note.title = this.noteForm.value.title;
    this.note.body = this.noteForm.value.body;
    if(this.note.title == ''){
      this.note.title = 'Untitled';
    }
    this.editMode = !this.editMode;
    this.noteService.editNote([this.id, this.note]);
  }
}