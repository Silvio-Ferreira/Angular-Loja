import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

}
