import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-container',
  templateUrl: './default-container.component.html',
  styleUrls: ['./default-container.component.scss']
})
export class DefaultContainerComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
