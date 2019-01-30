import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() onTyping = new EventEmitter<string>();
  @Input() value: string = '';
  debounce: Subject<string> = new Subject<string>();

  ngOnInit() {
    this.debounce
      .pipe(debounceTime(300)) //só vai chegar no subscribe quando ficar parado por 300 milisegundos
      .subscribe(filter => this.onTyping.emit(filter));
  }

  ngOnDestroy() {
    this.debounce.unsubscribe(); //Necessário pois não damos complete no subject, ou seja, podemos causar leaks sem isso
  }

}