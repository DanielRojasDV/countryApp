import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  
  private debouncer: Subject<string> = new Subject<string>;
  private debouncerSubscription?: Subscription; 
  
  @Input()
  public placeholder: string = '';

  @Input()
  public term: string ='';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();
  
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();
  
  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(500) 
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(inputSearch: string):void{
    //console.log('desde searchbox: ', inputSearch);
    this.onValue.emit( inputSearch );
  }

  onKeyPress( searchTerm: string ){
    
    this.debouncer.next(searchTerm);
  }
}
