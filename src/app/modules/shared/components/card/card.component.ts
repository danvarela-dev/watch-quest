import { Component, Input, OnInit } from '@angular/core';
import { CardData } from '../../interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  url =
    'https://conversationsabouther.net/wp-content/uploads/2014/10/Breaking-Bad.jpg';

  @Input() isThumbnail = false;
  @Input() card: CardData = {
    background: this.url,
    dimensions: { width: '800px', height: '400px' },
    title: 'Breaking Bad',
    trailer: 'youtube.com',
    rating: 4,
  };

  ratingArray = [];

  ngOnInit(): void {
    this.ratingArray.length = this.card.rating;

    this.card = {
      ...this.card,
      dimensions: {
        width: this.isThumbnail ? '100%' : this.card.dimensions.width,
        height: this.isThumbnail ? '100%' : this.card.dimensions.height,
      },
    };
  }
}
