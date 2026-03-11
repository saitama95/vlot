import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerAPI } from '../services/ver-api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor(
    private route : ActivatedRoute,
    private verapi:VerAPI,
  ) {}

  getCategoryArray:any[]=[];
  cateloading=false;
  ngOnInit() {
    this.route.queryParams.subscribe((params:any) => {
      let main_cat_id =  params.maincatid
      this.getCategories(main_cat_id);
    })
  }

  getCategories(main_cat_id:number){
    this.verapi.getCategories(main_cat_id).
    subscribe({
      next:(res:any)=>{
        this.getCategoryArray = res.records
      }
    })
  }
}
