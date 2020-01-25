import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../shared/can-deactivate.guard'

import { NoteListComponent } from '../note-list/note-list.component';
import { NoteNewComponent } from '../note-new/note-new.component';
import { NoteDetailComponent } from '../note-detail/note-detail.component';
import { SettingsComponent } from '../settings/settings.component';


const routes: Routes = [
{ path: '', component: NoteListComponent},
{ path: 'new', component: NoteNewComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'settings', component: SettingsComponent},
{ path: ':id', component: NoteDetailComponent, canDeactivate: [CanDeactivateGuard]},
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }