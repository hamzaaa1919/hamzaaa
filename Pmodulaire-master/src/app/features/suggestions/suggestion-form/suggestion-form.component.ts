import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  standalone: false,
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
  userForm!: FormGroup;

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      categorie: ['', Validators.required],
      date: [{ value: new Date(), disabled: true }],
      status: [{ value: 'en_attente', disabled: true }]
    });
  }

  // ── Getters ──

  get titre() { return this.userForm.get('titre'); }
  get description() { return this.userForm.get('description'); }
  get categorie() { return this.userForm.get('categorie'); }

  // ── Soumission ──

  submit(): void {
    if (this.userForm.valid) {
      const raw = this.userForm.getRawValue();

      const newSuggestion = {
        title: raw.titre,
        description: raw.description,
        category: raw.categorie,
        date: new Date(),
        status: 'en_attente',
        nbLikes: 0,
        isFavorite: false
      };

      this.suggestionService.addSuggestion(newSuggestion as any).subscribe({
        next: () => {
          this.router.navigate(['/suggestions']);
        },
        error: (err) => {
          console.error('Error adding suggestion', err);
        }
      });
    }
  }
}
