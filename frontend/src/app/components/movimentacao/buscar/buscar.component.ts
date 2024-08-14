import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { EventEmitter } from '@angular/core';

import { CategoriaInterface } from '../../../interface/categoria-interface';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})

export class BuscarComponent {

  
  @Input()
  listaCategorias: CategoriaInterface[] = [];
  @Input()
  formCategoryId = new FormControl();
  @Input()
  formDataDe = new FormControl('');
  @Input()
  formDataAte = new FormControl('');
  
  @Output()
  onSubmitOutput: EventEmitter<any> = new EventEmitter();
  @Output()
  resetFiltersOutput: EventEmitter<any> = new EventEmitter();

  onSubmit(event: Event) {
    event.preventDefault();
    this.onSubmitOutput.emit();
  }
  resetFilters() {
    this.resetFiltersOutput.emit();
  }
}
