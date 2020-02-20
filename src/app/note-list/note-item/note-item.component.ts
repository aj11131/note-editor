import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../shared/note.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
  @Input() note: Note;
  @Input() index: number;
  bodyPreview: string;
  titlePreview: string;
  previewLength = 140;
  titlePreviewLength = 75;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.note.body.length > this.previewLength) {
      this.bodyPreview = this.note.body.substring(0, this.previewLength) + '...';
    } else {
      this.bodyPreview = this.note.body.substring(0, this.previewLength);
    }
    if (this.note.title.length > this.titlePreviewLength) {
      this.titlePreview = this.note.title.substring(0, this.titlePreviewLength) + '...';
    } else {
      this.titlePreview = this.note.title.substring(0, this.titlePreviewLength);
    }
  }

  // when a note is clicked in the list navigate to the id number so the note-detail component is displayed
  openDetails() {
    this.router.navigate([this.index]);
  }
}
