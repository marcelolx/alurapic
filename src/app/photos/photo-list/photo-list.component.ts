import { Component, OnInit, OnDestroy } from '@angular/core';

import { Photo } from '../photo/photo';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {
  
  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.photos = this.activatedRoute.snapshot.data.photos;
    this.debounce
      .pipe(debounceTime(300)) //só vai chegar no subscribe quando ficar parado por 300 milisegundos
      .subscribe(filter => this.filter = filter);
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe(); //Necessário pois não damos complete no subject, ou seja, podemos causar leaks sem isso
  }

}
