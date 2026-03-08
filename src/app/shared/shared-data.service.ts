import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController, IonContent, NavController  } from '@ionic/angular';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Firestore,collection,collectionData,doc,addDoc,deleteDoc,getDocs,onSnapshot,updateDoc,query,where,limit,orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(
    private http: HttpClient,
    private storage : Storage,
    private navCtrl : NavController,
    public firebase:Firestore,
    private alertController: AlertController,
   // private iab : InAppBrowser,
    private router:Router,
    ) { 
  }
  content!:IonContent;
 
  sendcontent(content:any){
    this.content = content;
  }


  deleteFireStoreData(id:number){
    try{
      let docRef = doc(this.firebase,'notes/'+id);
      return deleteDoc(docRef);
    }
    catch(err){
      return err;
    }
   
  }

  async checkUserLogin(){
    // const userid = await this.storage.get('userId');
    // if(!userid){
    //   this.navCtrl.navigateRoot('tabs/tab5')
    // }
  }

 async genreateUnique_id(id:number,subsubcatid:number,formtype:any,maincatid:number,subcatid=0){
    try{
      const userId =  await this.storage.get("userId");
      let formnewData = {
        proid : id,
        subcatid : subcatid,
        subsubcatid : subsubcatid,
        formtype : formtype,
        user_id : userId,
        maincatid :maincatid,
      }
      const res:any = this.http.post('https://verkaufalles.at/api/finalsubmit/generateprod_id.php',JSON.stringify(formnewData),{responseType : 'text'}).toPromise();
      const responsedata = JSON.parse(res);
      return responsedata;
    }
    catch(error){
      console.log(error);
    }
  }

  async changeGermanForm(){
    setTimeout(() => {
      try{
        let zimmer = (document.querySelectorAll('.zimmer'));
      zimmer.forEach(item=>{
        let z = (item.textContent);
        item.textContent = z.replace('.',',');
      })
      }catch(err){
        console.log("zimmer class not found!!");
      }
      

      try{
        let engery = (document.querySelectorAll('.energy_form'));
        engery.forEach(item=>{
          let price = parseFloat(item.textContent);
          let news=  price.toLocaleString('de-DE');
          item.textContent = news;
        })
      }
      catch(err){
        console.log("energy_form class not found!!");
      }
     
      
      let span = (document.querySelectorAll('.german_form'));
      span.forEach(item=>{

          if(/[a-zA-Z]/g.test(item.textContent)){
            let str = '';
            let val = (item.textContent).split(" ");
            let price = parseFloat(val[0]);
            let newpr = price.toLocaleString('de-DE',{currency: 'EUR', style: 'currency'});
            val[0] = newpr.replace('€','');
            item.textContent = val.join(" ");
          }else{
            let price = parseFloat(item.textContent);
            let newpr;
   
              newpr = price.toLocaleString('de-DE',{currency: 'EUR', style: 'currency'});
              let news = newpr.replace('€','');
              item.textContent = news;
            //}
          }
      })
    },0);
  }

  topheader=true;
  lastScrollTop=0;
  // logScrolling(event:any,distanceFromBottom=1,stopThreshold=0) {
  //   let currentY = (event.detail.scrollTop);
  //   if(distanceFromBottom>1){
  //     console.log(distanceFromBottom);
  //     if(distanceFromBottom <= stopThreshold){
  //       console.log("stop");
  //        return;
  //       }
  //       if(currentY>500){
  //         const scrollTop = event.detail.currentY;
  //         if (currentY > this.lastScrollTop) {
  //           document.getElementById('headerFlag').style.display = "none";
  //         } else {
  //           document.getElementById('headerFlag').style.display = "block";
  //         }
  //         this.lastScrollTop = scrollTop;
  //       }else{
  //         document.getElementById('headerFlag').style.display = "block";
  //       } 
      
  //   }else{    
     
  //     if(currentY>500){
  //       const scrollTop = event.detail.scrollTop;
  //       if (currentY > this.lastScrollTop) {
  //         document.getElementById('headerFlag').style.display = "none";
  //       } else {
  //         document.getElementById('headerFlag').style.display = "block";
  //       }
  //       this.lastScrollTop = scrollTop;
  //     }else{
  //       document.getElementById('headerFlag').style.display = "block";
  //     }
    
  //   }
    
  //  }


   globalarr:any[]=[];
   checkGridView="";
   async ScrollToBottom(currentY:number) {
    setTimeout(() => {
      this.content.scrollToPoint(currentY,currentY,0);
    }, 1000);
  }

  getScrollValueForLocal(arr:any){
    this.globalarr.push(...arr);
    if(arr.length>0){
      Promise.all([this.storage.get("currentY")]).then(val=>{
       let  currentY:any=val[0];
       this.ScrollToBottom(currentY); 
      }); 
    }
  }
  onScrollfunc(event:any){
    let currentY;
    //.logScrolling(event);	
    currentY = (event.detail.currentY);
    if(this.checkGridView){
      currentY=currentY/2.3;
      currentY=Math.floor(currentY);
    }
    Promise.all([this.storage.set("currentY",currentY)]).then((res) =>{

    })
  }
  changeScrollValue(){
    Promise.all([this.storage.set("currentY",0)]);
  }

 
  ///////////////////////////checkbox selected/////////////////////////////////
  timelimit = 0;
  showPrevious(nameArr:any){
    setTimeout(() => {
      if(nameArr.length==0) return;
      let check = document.querySelectorAll('.check');
      check.forEach(item=>{
        if(item.nextElementSibling){
          let sibiling = item.nextElementSibling.textContent;
           nameArr.map((val:any)=>{
            let x = val.charAt(0);
              let newstr = val;
              if(newstr == sibiling){
                let ele = item as HTMLInputElement;
                ele.checked = true;
              } 
            });
        }
      })
    },this.timelimit);
  }

  removespacebeforeCommon(inputString:any){
    if(!inputString) return;
    const stringWithoutSpaces = inputString.replaceAll(" ,", ",").replaceAll(", ", ",");

    // const stringWithoutSpaces = inputString.replaceAll(" ,",',').replaceAll(", ",',');
    return  stringWithoutSpaces;
  }
  changestringtoarray(strdata:any,time=0){
    if(!strdata) return;
    this.timelimit = time;
  
    var names = this.removespacebeforeCommon(strdata);
    let newstr = names.replaceAll("'","");
    var nameArr = newstr.split(',');
    this.showPrevious(nameArr);
  }
  changestringtoarray2(strdata:any,time=0){
    if(!strdata) return;
    this.timelimit = time;
    var names = this.removespacebeforeCommon(strdata);
    var nameArr = names.split(',');
    this.showPrevious(nameArr);
  }
  ///////////////////////////end checkbox selected/////////////////////////////////

  ///////////////////////////////////////whislist/////////////////////////////////////////////  
  addtoWishlist2(proid:number,form_type:any,event:any){
    if(event.target.getAttribute('value')=="on")
    {
      event.target.setAttribute('value','off');
      event.target.setAttribute('name','heart');
    }
    else if(event.target.getAttribute('value')=="off")
    {
      event.target.setAttribute('value','on');
      event.target.setAttribute('name','heart-outline');
    }
    Promise.all([this.storage.get("userId")]).then(values => {
      let userid = values[0];
      if(userid != ''){
        let formdata = {
          proid : proid,
          form_type : form_type,
          userid : userid,
        }
        this.http.post('https://verkaufalles.at/api/wishlist/addtowishlist.php',JSON.stringify(formdata),{responseType : 'text'}).subscribe((res:any)=>{
        });
       // this.ngOnInit();
      }
    })
  }
  ///////////////////////////////////////end whislist///////////////////////////////////////////// 


  changeView2(evt:any,btnname:any) {
    if(evt.target.classList[1] == 'fa-th-large'){
      this.checkGridView = 'grid';
     }else if(evt.target.classList[1] == 'fa-bars'){
       this.checkGridView = '';
     }
    var i, tabcontent:any, tablinks:any;
    if(!document.getElementsByClassName("tabcontent").length) return;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("btn");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.target.parentElement.classList.add('active');
   // document.getElementById(btnname).style.display = "block";
  }

  addSpaceBetweenWord(str:any){
    if(Array.isArray(str)){
      let newstr:any = str.toString();
      let newstr2 = newstr.replaceAll(",",", ");
      return newstr2;
    }
    let newstr = str.replaceAll(",",", ");
    return newstr;
  }
  convertDataForUrl(data:any){
    let arr = data.split(",");
    let convert = "'"+arr.join("','")+"'";
    return convert;
  }
  vonval = "";
  bisval = "";
  vonkm = "";
  biskm = "";
  // getpriceVon(value:any,icon:string,field:string,fieldname=""){
  //   if(value == 0){
  //     document.getElementById(field)['value']="";
  //   }
  //   if(value == ''){
  //     document.getElementById(field).style.borderColor = "red";
  //     document.getElementById(icon).style.borderColor = "red";
  //   }
  //   else{
  //     document.getElementById(field).style.borderColor = "#b5b1b1";
  //     document.getElementById(icon).style.borderColor = "#b5b1b1";
  //   }

  //   if(fieldname == "von"){
  //     this.vonval = value;
  //     // if(this.bisval<=this.vonval){
  //     //   document.getElementById(field).style.borderColor = "red";
  //     //   document.getElementById(icon).style.borderColor = "red";
  //     // }else{
  //     //   document.getElementById(field).style.borderColor = "#b5b1b1";
  //     //   document.getElementById(icon).style.borderColor = "#b5b1b1";
  //     // }
  //   }

  //   if(fieldname == "bis"){
  //       this.bisval = value;
  //       if(this.bisval<=this.vonval){
  //         document.getElementById(field).style.borderColor = "red";
  //         document.getElementById(icon).style.borderColor = "red";
  //       }else{
  //         document.getElementById(field).style.borderColor = "#b5b1b1";
  //         document.getElementById(icon).style.borderColor = "#b5b1b1";
  //       }
  //   }

  //   if(fieldname == 'vkm'){
  //     this.vonkm = value;
  //   }

  //   if(fieldname == 'bkm'){
  //       this.biskm = value;
  //       if(this.biskm<=this.vonkm){
  //         document.getElementById(field).style.borderColor = "red";
  //         document.getElementById(icon).style.borderColor = "red";
  //       }else{
  //         document.getElementById(field).style.borderColor = "#b5b1b1";
  //         document.getElementById(icon).style.borderColor = "#b5b1b1";
  //       }
  //   }
  // }

  removeActiveclass(){
    let btns:any = document.getElementsByClassName('btn2');
      for(let index = 0;index<btns.length;index++){
       (btns[index]).classList.remove('active2');
      }
  }

  activeSuchebtn(event:any='',type=''){
    if(event || type){
      let value = event.target;
      sessionStorage.setItem('headerbtn',type);
      this.removeActiveclass();
      value.classList.add('active2');
    }
  }
 

  async updateSeenStatus(id:any,status:boolean){
    try{
      if(id==0) return;
      let docRef = doc(this.firebase, `userlist`,id);
      await updateDoc(docRef, { 
        seen:status
      }).then((res:any)=>{
        console.log(res);
      })
    } 
    catch(err){
      console.log('Unable to update seen status');
   }
  }

   async updateSeenStatusOnDatabase(id:any,seen:any,blockStatus:any){
    let data = {
      id:id,
      seen:seen,
      blockStatus:blockStatus
    };
    this.http.post(`https://verkaufalles.at/api/chat/seenstatus.php`,JSON.stringify(data)).subscribe((res:any)=>{
      
    })
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Bis zum 31.12.2024 kannst du deine Anzeigen kostenlos veroffentlichen',
      cssClass: 'adfreenotice',
      backdropDismiss: false,
      buttons: ['OK'],
    });

    await alert.present();
  }

  /////////////////////////////// custome histroy back /////////////////////////////////////////////////
  checkIfUrlAlreadyExit(urlsarr:any,currenturl:any):boolean{
    return urlsarr.find((item:any)=>item==currenturl);
  }

  // storeNavtivationHistroy(url:string){
  //   let spliturl="";
  //   let actualUrl="";
  //   if(url.includes("pages")){
  //      spliturl = url.split("pages")[1];
  //      actualUrl = `pages${spliturl}`;
  //   }else{
  //      spliturl = url.split("tabs")[1];
  //      actualUrl = `tabs${spliturl}`;
  //   }
  //   let data = [];
  //   if(sessionStorage.getItem('navHistroy')){
  //     let oldUlr = JSON.parse(sessionStorage.getItem('navHistroy'));
  //     data.push(...oldUlr);
  //     if(!this.checkIfUrlAlreadyExit(data,actualUrl)){
  //       data.push(actualUrl);
  //       sessionStorage.setItem('navHistroy',JSON.stringify(data));
  //     }
  //     return;
  //   }
  //   data.push(actualUrl)
  //   sessionStorage.setItem('navHistroy',JSON.stringify(data));
  // }

  // backwithHistroy():string{
  //   if(sessionStorage.getItem('navHistroy')){
  //     let data = [];
  //     let oldUlr = JSON.parse(sessionStorage.getItem('navHistroy'));
  //     data.push(...this.checkForLoop(oldUlr));
  //     let backpageUrl = data.pop();
  //     sessionStorage.setItem('navHistroy',JSON.stringify(data));
  //     if(data.length==0){
  //       sessionStorage.removeItem('navHistroy');
  //     }
  //     return backpageUrl;
  //   }
  //   return "tabs/tab1";
  // }

  checkForLoop(oldUlrarr:any){
    let fullUrl = window.location.href;
    let spliturl = fullUrl.split("pages")[1];
    let currenturl = `pages${spliturl}`;
    let newdata = oldUlrarr.filter((item:any)=>item!=currenturl);
    return newdata;
  }
  removeStringAfterChar(str:any, char:any) {
    var index = str.indexOf(char);
    if (index !== -1) {
        return str.substr(0, index);
    }
    return str;
  }

  removeStringFormSpecifiedPostion(url:string,positon:number){
      let thirdAmpersandIndex = -1;
      let count = 0;
      for (let i = 0; i < url.length; i++) {
          if (url[i] === '&') {
              count++;
              if (count === positon) {
                  thirdAmpersandIndex = i;
                  break;
              }
          }
      }

      // Extract the substring before the third '&' character
      let modifiedUrl;
      if (thirdAmpersandIndex !== -1) {
          modifiedUrl = url.substring(0, thirdAmpersandIndex);
          return modifiedUrl;
      } else {
          return url;
      }
  }

  async getMessageCount(){
    let sum = 0;
    try {
      const userid = await this.storage.get('userId');
      const messageRef = collection(this.firebase, "unreadmessagecount");
      onSnapshot(query(messageRef,where('reciverId','==',userid),orderBy('id','desc')),(querySnapshot)=>{
        querySnapshot.forEach((doc:any)=>{
          let datanew = doc.data();
          sum = sum+datanew.count;
        })
      })
    } catch (e) {
      console.log("Unable to sum all message count");
    }
    return sum;
  }

  async removeUserFormFirebase(ids:any[]){
    try{
      for(let id of ids){
        let docRef = doc(this.firebase, "userlist",id);
        await deleteDoc(docRef).then(item=>{
          console.log("Users remove");
        })
      }
    }
    catch(err){
      console.log('Unable to remove users!!');
    }
  }

  async removeMessageFirebase(messagesId:any){
    try{
      for(let id of messagesId){
        let docRef = doc(this.firebase, "messages",id);
        await deleteDoc(docRef).then(item=>{
          console.log("Delete successfully");
        })
      }
    }
    catch(err){
      console.log('Unable to messages users!!');
    }
  }

  // async gotocheckoutpage(uniqueId:number,prod_id:number,user_id:number,subsubcatid:number,form_type:string) {
  //   const paymentUrl = 'https://verkaufalles.at/api/qenta_payment/index.php?lastId='+uniqueId;
  //    // Define options for the InAppBrowser
  //   const options: InAppBrowserOptions = {
  //     hideurlbar: 'yes', // Hide the URL bar
  //     zoom: 'no', // Hide the URL bar
  //     hidenavigationbuttons : 'yes',
  //     toolbar: 'no',
  //     location: 'no' // Hide the close button
  //   };
  //   let paymentStatus;
  //   const browser: InAppBrowserObject = this.iab.create(paymentUrl, '_blank', options);
  
  //   // Add an event listener to handle URL changes
  //   browser.on('loadstart').subscribe(event => {
  //     // Check if the URL has changed to the success URL
  //     if (event.url === 'https://verkaufalles.at/api/qenta_payment/close.php?status=SUCCESS') {
  //       paymentStatus = 'SUCCESS'; 
  //       // Close the in-app browser
  //       // if (paymentStatus === 'SUCCESS') {
  //       //   console.log('Payment successful!');
  //       //   let paymentdata = {
  //       //     uniqueId : uniqueId,
  //       //     id : prod_id,
  //       //     userid : user_id,
  //       //     subsubcatid : subsubcatid,
  //       //     form_type : form_type,
    
  //       //   }
  //       //   this.http.post('https://verkaufalles.at/api/propertyform/updatepaymentstatus.php',JSON.stringify(paymentdata),{responseType : 'text'}).subscribe((res:any)=>{
  //       //     // let responsedata = (JSON.parse(res));
  //       //     let responsedata = JSON.parse(res);
  //       //     console.log(responsedata);
    
  //       //   })
  //       //   // Perform actions based on successful payment
  //       // } else {
  //       //   console.log('Payment status unknown or unsuccessful.');
  //       // }
  //       setTimeout(() => {
  //         browser.close();
  //       }, 1000);
  //       // this.navCtrl.navigateRoot('tabs/tab1');
  //       // Communicate the success to your Ionic app (e.g., navigate to a success page)
  //       // For example:
  //       // this.router.navigateByUrl('/payment-success');
  //     }
  //   });

    
  // }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Spam-Beitrag erfolgreich.',
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  viewProductDetailPage(id:any,subcatid:number,subsubcatid:number,form_type:any,category_id:number,categorylevel:any){
      //this.storeNavtivationHistroy(window.location.href);
        if(subsubcatid >= 230 && subsubcatid <= 241){
          this.router.navigate(['/pages/propertyproductdetails'], {  queryParams: {  catid: subsubcatid,proid:id } });
          
        }else if(subcatid>=38 && subcatid<=42 || subcatid==51 || subcatid==52 || subcatid==70  ){
  
          if(form_type == "SparePart"){
            this.router.navigate(['/pages/automotorproductdetail'], {  queryParams: {  carautoid: subsubcatid,proid:id,formname:"\""+form_type+"\"" } });
          }else{
            this.router.navigate(['/pages/automotorproductdetail'], {  queryParams: {  carautoid: subsubcatid,proid:id,formname:"\""+form_type+"\""  } });
          }
  
        }else if(subsubcatid == 250 || subsubcatid == 251){
  
          this.router.navigate(['/pages/automotorproductdetail'], {  queryParams: {  carautoid: subsubcatid,proid:id,formname:"\""+form_type+"\"" } });
          
        }else if((category_id>=27 && category_id<=31 ) || (category_id>=53 && category_id<=61)){
          
          this.router.navigate(['/pages/shopdetailspage'], {  queryParams: {  shopid: id,getshopid:category_id,activeTab:1 } });
  
        }else if(subcatid == 21 || subcatid == 22 || subcatid == 23 || subcatid == 24 || subcatid == 25 || subcatid == 67 || subcatid == 68 || subcatid == 71){
  
          this.router.navigate(['/pages/petsproductdetail'], {  queryParams: {  subcatid: subcatid,proid:id } });
  
        }else if(form_type == "Marketplace"){
          
          console.log(category_id+'markteplace');
          this.router.navigate(['/pages/productdetailspage'], {  queryParams: {  subscatid: subsubcatid,categoryid:category_id,proid:id,categorylevelname:"\""+categorylevel+"\"" } });
         
        }
  
    }

    async blockUserFirebase(id:any,status:any){
      try{
        if(id==0) return;
        let docRef = doc(this.firebase, `userlist`,id);
        await updateDoc(docRef, { 
          block:status
        }).then((res:any)=>{
          console.log(res);
        })
      } 
      catch(err){
        console.log('Unable to block user');
     }
    }

    // async checkBlockStatus(id){

    // }
}
