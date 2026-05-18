import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Suggestion } from '../models/suggestion';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  apiSuggestionsUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) { }
  getAllSuggestions() {
    return this.http.get<Suggestion[]>(this.apiSuggestionsUrl);
  }

  getSuggestionById(id: number) {
    return this.http.get<{ success: boolean, suggestion: Suggestion }>(this.apiSuggestionsUrl + '/' + id).pipe(
      map(response => response.suggestion)
    );
  }

  addSuggestion(suggestion: Suggestion) {
    return this.http.post<Suggestion>(this.apiSuggestionsUrl, suggestion);
  }

  deleteSuggestion(id: number) {
    return this.http.delete(this.apiSuggestionsUrl + '/' + id);
  }

  updateSuggestion(id: number, suggestion: Suggestion) {
    return this.http.put(this.apiSuggestionsUrl + '/' + id, suggestion);
  }
}
