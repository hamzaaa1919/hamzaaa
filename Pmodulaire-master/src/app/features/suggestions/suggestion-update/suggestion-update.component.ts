import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-update',
  standalone: false,
  templateUrl: './suggestion-update.component.html',
  styleUrl: './suggestion-update.component.css'
})
export class SuggestionUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  suggestionId!: number;
  loading = true;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  suggestion!: Suggestion;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit(): void {
    this.suggestionId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadSuggestion();
  }

  initForm(): void {
    this.updateForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      categorie: ['', Validators.required],
      status: ['']
    });
  }

  loadSuggestion(): void {
    this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
      next: (suggestion: Suggestion) => {
        if (suggestion) {
          this.suggestion = suggestion;
          this.updateForm.patchValue({
            titre: suggestion.title,
            description: suggestion.description,
            categorie: suggestion.category,
            status: suggestion.status
          });
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error loading suggestion', err);
        this.loading = false;
      }
    });
  }

  get titre() { return this.updateForm.get('titre'); }
  get description() { return this.updateForm.get('description'); }
  get categorie() { return this.updateForm.get('categorie'); }

  onSubmit(): void {
    if (this.updateForm.valid && this.suggestion) {
      const raw = this.updateForm.value;
      
      const updatedSuggestion: Suggestion = {
        ...this.suggestion,
        title: raw.titre,
        description: raw.description,
        category: raw.categorie,
        status: raw.status || this.suggestion.status
      };

      this.suggestionService.updateSuggestion(this.suggestionId, updatedSuggestion).subscribe({
        next: () => {
          this.router.navigate(['/suggestions/details', this.suggestionId]);
        },
        error: (err) => {
          console.error('Error updating suggestion', err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/suggestions/details', this.suggestionId]);
  }
}
