import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

import { CategoriaInterface } from '../../../../interface/categoria-interface';

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
  onSubmit: (event: Event) => void
  @Input()
  resetFilters: () => void
  
  
  @Input()
  formCategoryId = new FormControl();
  @Input()
  formDataDe = new FormControl('');
  @Input()
  formDataAte = new FormControl('');
  
  constructor() {
    this.onSubmit = (event: Event) => {
    };
    this.resetFilters = () => {
    };
  }

}
