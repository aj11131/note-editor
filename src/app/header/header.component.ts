import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NoteService } from '../shared/note.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('search', {static:true}) search: ElementRef;
  @ViewChild('searchIcon', {static:true}) searchIcon: ElementRef;
  @ViewChild('nav', {static:true}) nav: ElementRef;
  searchMode = false;
  searchIconVisible = true;

  constructor(private noteService: NoteService, private router: Router, private elRef: ElementRef) { }

  ngOnInit() {
    // Show search icon when at homepage and hide if else
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(val => {
      if(val['url'] == '/'){
        this.searchIcon.nativeElement.style.display = "block";

      } else {
        this.searchIcon.nativeElement.style.display = "none";
        this.search.nativeElement.style.display = "none";
      }
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.elRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  // on input, call the searchNotes method from the NoteService
  searchNotes(e){
    this.noteService.searchContents.next(e.target.value);
  }

  // Show/hide search bar if user clicks search icon
  toggleSearch() {
    this.searchMode = !this.searchMode;
    if(this.searchMode === true){
      this.search.nativeElement.style.display = "block";
      this.search.nativeElement.focus();
    } else {
      this.search.nativeElement.style.display = "none";
      this.search.nativeElement.value = '';
      this.noteService.searchContents.next('');
    }
  }

  closeMenu(){
    this.nav.nativeElement.checked = false;
  }

}
