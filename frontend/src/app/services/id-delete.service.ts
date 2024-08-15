import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {
  
  private id!: number;

  constructor() { }

  setId(id: number) {
    this.id = id;
  }
  
  getId(): number {
    return this.id;
  }
}

