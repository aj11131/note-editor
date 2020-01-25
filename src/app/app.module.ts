import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { CanDeactivateGuard } from './shared/can-deactivate.guard';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteItemComponent } from './note-list/note-item/note-item.component';
import { NoteService } from './shared/note.service';
import { NoteNewComponent } from './note-new/note-new.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { TextareaAutoGrowDirective } from './shared/textarea-auto-grow.directive';
import { SettingsComponent } from './settings/settings.component'

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, HeaderComponent, NoteListComponent, NoteItemComponent, NoteNewComponent, NoteDetailComponent, TextareaAutoGrowDirective, SettingsComponent ],
  bootstrap:    [ AppComponent ],
  providers: [NoteService, CanDeactivateGuard]
})
export class AppModule { }
