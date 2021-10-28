import { Component, OnInit } from '@angular/core';
import { ProgessBarService } from 'src/app/Servicios/progess-bar.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private barra: ProgessBarService) { }

  ngOnInit(): void {
    this.barra.progressBarReactive.next(false);
    this.barra.progressBarReactive.next(true);
  }

}
