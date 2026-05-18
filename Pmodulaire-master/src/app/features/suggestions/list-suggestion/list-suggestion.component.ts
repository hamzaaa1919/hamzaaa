import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  standalone: false,
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})

export class ListSuggestionComponent implements OnInit {
  suggestions: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) { }

  ngOnInit(): void {
    this.suggestionService.getAllSuggestions().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => {
        console.error('Error fetching suggestions', err);
      }
    });
  }

  searchTerm: string = '';

  favorites: Suggestion[] = [];

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchTerm.trim()) {
      return this.suggestions;
    }
    const term = this.searchTerm.toLowerCase();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term)
    );
  }



  likeSuggestion(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  toggleFavorite(suggestion: Suggestion): void {
    suggestion.isFavorite = !suggestion.isFavorite;

    if (suggestion.isFavorite) {
      if (!this.favorites.find(f => f.id === suggestion.id)) {
        this.favorites.push(suggestion);
      }
    } else {
      this.favorites = this.favorites.filter(f => f.id !== suggestion.id);
    }
  }
}
