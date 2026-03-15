import { Component, Input, OnInit } from '@angular/core';
import { VerAPI } from 'src/app/services/ver-api';

@Component({
  selector: 'app-breadcrumbsfeild',
  templateUrl: './breadcrumbsfeild.component.html',
  styleUrls: ['./breadcrumbsfeild.component.scss'],
  standalone:false
})
export class BreadcrumbsfeildComponent  implements OnInit {

  @Input() subcatid=0;
  subcatname:string="";
  subsubcatname:string="";
   @Input() subsubcatid:number=0;
  constructor(
     private verapi:VerAPI,
  ) { }

  ngOnInit() {
    this.verapi.getSubCatNames(this.subcatid).subscribe({
      next:(res:any)=>{
        let {id,name}:any = (res['subcatdata'][0]);
        this.subcatname = name;
        this.subsubcatname = this.getsubsubcatdata(res['subcatdata'][0].subsubcatdata,this.subsubcatid)
      }
    })
  }

   getsubsubcatdata(datasubsubcatid:any[],id:number,nextIdflag=false){
    let {name} = datasubsubcatid.find(item=>item.subsubcatid == id);
      return name;
  }
}
