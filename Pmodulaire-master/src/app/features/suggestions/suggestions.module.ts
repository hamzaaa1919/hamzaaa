import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { SharedModule } from '../../shared/shared.module';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';
import { RouterModule } from '@angular/router';
import { SuggestionUpdateComponent } from './suggestion-update/suggestion-update.component';


@NgModule({
  declarations: [
    SuggestionsComponent,
    ListSuggestionComponent,
    SuggestionDetailsComponent,
    SuggestionFormComponent,
    SuggestionUpdateComponent
  ],
  imports: [
     CommonModule,
    FormsModule,
     RouterModule,
    SuggestionsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SuggestionsModule { }
