import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerAPI } from '../services/ver-api';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

    //  this.navCtrl.navigateRoot(`/pages/productlistpage?maincatid=1&getid=${getId}&scrollPoint=${this.scrollPoint}&sscatPoint=${this.sscatPoint}&subcatname=${getname}`);
  constructor(
    private route : ActivatedRoute,
    private verapi:VerAPI,
    private navCtrl:NavController,
    private router:Router
  ) {}

  getCategoryArray:any[]=[];
  cateloading=false;

  subsubcatArrayData:any[] = [];
  main_cat_id:number=0;

  marketCate:any[]=[];
  autoCate:any[]=[];
  propertyCate:any[]=[];
  petCate:any[]=[];

  cmvalue="<30cm";
  submarketCate:any[]=[];
  subautoCate:any[]=[];
  subpropertyCate:any[]=[];
  subpetCate:any[]=[];

  subcatidM:number=0;
  subcatidA:number=0;
  subcatidPt:number=0
  subcatidPet:number=0;


  getActiveIdM = () => this.subcatidM;
  getActiveIdA = () => this.subcatidA;
  getActiveIdPt = () => this.subcatidPt;
  getActiveIdPet = () => this.subcatidPet;
  getpropertyId:number=0;
  ngOnInit() {
    this.route.queryParams.subscribe((params:any) => {
      this.main_cat_id= params.maincatid
      this.getpropertyId = params.getpropertyId;
    })
    this.getMarketCategories(1);
    this.getpropertyCategories(2);
    this.getAutoCategories(3);
    this.getpetCategories(5);
  }

   propertyList(propcatid:number,subcatid:number){
      this.navCtrl.navigateRoot(`/tabs/propertyproductlist?propcatid=${propcatid}&subcatid=${subcatid}`)
    }

  // markte place  
  getMarketCategories(main_cat_id:number){
    this.verapi.getCategories(main_cat_id).
    subscribe({
      next:(res:any)=>{
        this.marketCate = res.records
        let id  = this.marketCate[0].id
        this.getsubCategoriesMarket(id,main_cat_id)
      }
    })
  }

  getsubCategoriesMarket(id:number,main_cat_id:number,){
    this.subcatidM = id;
    this.verapi.getSubCategories(id,main_cat_id).subscribe({
      next:(res:any)=>{
        this.submarketCate = res['subcatdata'];
      }
    })
  }
  // end markte place  

  // property place  
    getpropertyCategories(main_cat_id:number){
      this.verapi.getCategories(main_cat_id).
      subscribe({
        next:(res:any)=>{
          this.propertyCate = res.records
          let id = this.propertyCate[0].id
          this.getsubCategoriesproperty(id,main_cat_id)
        }
      })
    }

    
    getsubCategoriesproperty(id:number,main_cat_id:number){
      this.subcatidPt = id;
      this.verapi.getSubCategories(id,main_cat_id).subscribe({
        next:(res:any)=>{
          this.subpropertyCate  = res['subcatdata'];
        }
      })
    }

  // endproperty place  

  //auto 
  getAutoCategories(main_cat_id:number){
    this.verapi.getCategories(main_cat_id).
    subscribe({
      next:(res:any)=>{
        this.autoCate = res.records
        let id = this.autoCate[0].id
        this.getsubCategoriesAuto(id,main_cat_id)
      }
    })
  }


  getsubCategoriesAuto(id:number,main_cat_id:number){
      this.subcatidA = id;
      this.verapi.getSubCategories(id,main_cat_id).subscribe({
      next:(res:any)=>{
        this.subautoCate  = res['subcatdata'];
      }
    })
  }
//end auto
 
  //pet
  getpetCategories(main_cat_id:number){
    this.verapi.getCategories(main_cat_id).
    subscribe({
      next:(res:any)=>{
        this.petCate = res.records
        let id = this.petCate[0].id
        this.getsubCategoriesPet(id,main_cat_id)
      }
    })
  }

   getsubCategoriesPet(id:number,main_cat_id:number){
      this.subcatidPet = id;
      this.verapi.getSubCategories(id,main_cat_id,this.cmvalue).subscribe({
      next:(res:any)=>{
        this.subpetCate  = res['subcatdata'];
      }
    })
  }

  filterpet(cm:string){
    this.cmvalue=cm;
    this.getsubCategoriesPet(21,5)
  }

 // end pet

}
