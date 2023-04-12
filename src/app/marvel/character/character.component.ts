import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, debounceTime, Subject, Subscription } from 'rxjs';
import { ApiRequest } from 'src/app/common/models/api.model';
import { Character } from 'src/app/common/models/marvel-models/character.model';
import { CharacterService } from 'src/app/services/marvel-services/character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, AfterViewInit, OnDestroy {
  // Container with characters
  @ViewChild('characterContainer') characterContainer!: ElementRef;

  // Booleans
  loadingBoolean: boolean = true;
  isFirstLoad: boolean = true;

  // Arrays
  characters: Character[] = [];

  // Pagination
  pagination: number = 0;

  // Search engine
  search = new BehaviorSubject<string>('');
  searchSubscription = new Subscription();
  searchTerm: string = '';
  searchTermCount: number = 0;

  constructor(private characterService: CharacterService) {
        // Searcher
        this.searchSubscription = this.search.pipe(debounceTime(500)).subscribe((term) => {
          this.pagination = 0;
          this.isFirstLoad = true;
          this.searchTerm = term;
          this.refreshCharacters();
        });
  }

  ngOnInit(): void {
    this.refreshCharacters();
  }

  ngAfterViewInit(): void {
    this.characterContainer.nativeElement.addEventListener('scroll', this.handlerScroll.bind(this));
  }

  ngOnDestroy(): void {
    //Remove scroll listener on container div
    this.characterContainer.nativeElement.removeEventListener('scroll', this.handlerScroll.bind(this))
  }

  refreshCharacters() {
    const request = new ApiRequest();
    request.offset = this.pagination;
    if (this.searchTerm) {
      request.nameStartsWith = this.searchTerm;
    }
    this.characterService.getCharacters(request).subscribe({
      next: (rtn) => {
        if (this.isFirstLoad) {
          this.characters = rtn.data!.results!
        } else {
          this.characters = [...this.characters, ...rtn.data!.results!];
        }
        this.isFirstLoad = false;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loadingBoolean = false;

      }
    })
  }

  searchText(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.next(input.value);
  }

  handlerScroll() {
    const element = this.characterContainer.nativeElement;
    const scrolledToBottom = element.scrollHeight - element.scrollTop <= element.clientHeight;
    const addMoreCharacters = this.pagination < this.characters.length + 100;
    if (scrolledToBottom && addMoreCharacters) {
      this.loadingBoolean = true;
      this.pagination += 20;
      this.refreshCharacters();
    }
  }

}
