import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  standalone: false,
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit {
  id!: number;
  suggestion?: Suggestion;

  constructor(private ar: ActivatedRoute, private suggestionService: SuggestionService) { }

  ngOnInit(): void {
    // Récupération de l'ID depuis l'URL
    this.id = Number(this.ar.snapshot.params['id']);
    
    // Récupération de la suggestion depuis le service
    this.suggestionService.getSuggestionById(this.id).subscribe({
      next: (data) => {
        this.suggestion = data;
        console.log(this.suggestion);
      },
      error: (err) => {
        console.error('Error fetching suggestion details', err);
      }
    });
  }
}
