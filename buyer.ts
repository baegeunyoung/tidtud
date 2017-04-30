import { Component, ViewChild,  } from '@angular/core';
import { NavController, NavParams, Card,} from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Something } from './some/path';
declare var jQuery:any;

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buyer',
  templateUrl: 'buyer.html'
   
})
export class BuyerPage {
  @ViewChild(Card) login: Card;
  private token: string ="mhghjgjkgkjgjkhgkjgkjgjuhtre546436rgh";
  private tokenObj: Object  ;
  private html:string = "" ;
  private menus:string ="";
  private menu: any;
  private orderContent="";
  private orderContentObj: Object;
  private img:string = "";
  private store:string = "";
  private menuFile:string="";
  private major: number = 80;
  private majorObj: Object;
  private minor: number = 1;
  private minorObj: Object;
  private quantity:any;
  private name:string="";
  private price:number;
  private content: string="";
  private val: any;
  private seller: number;
  // private a: number=0;
// public a= {};
 
  m : Object[];
  d : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http : Http ) {
 this.m=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  buyerList() {
      let link = "http://14.32.66.123:10001/bit902app/book/timeCheck.do";
      this.html = "";
      this.http.get(link)
        .map(res => res.json())
        .subscribe(data=>{
          
          console.log("success");
          console.log(data);
          	for(let i = 0; i < data.length; i++) {
              console.log(data[i].name);
            	this.html += "<p> 이름 : " + data[i].name + " 아이디 : " + data[i].id + " 전화번호 :  " + data[i].cellphoneNumber +  "<input type='text></p>";
          
					}
          console.log(this.html);
        },error => {
          console.log("error");
        }); 
    } 
    menuList() {
      let sellerNo = 80;
      this.major = sellerNo;
      this.menu = "";
      this.menuFile = "";
      let tableNo = 1;
      let data = sellerNo;
      let link = "http://192.168.0.201:9090/bit902app/menu/list.do";
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      
      
      console.log(data);
      this.http.post(link, data, options)
        .map(res => res.json())
        .subscribe(data=>{
          console.log(data);
            
        data.menu.forEach(m =>{
            m.quantity = 0;
          })
         
          this.menu = data.menu;
          this.menuFile = data.menuFile;
  
         
        },error => {
          console.log("error");
        }); 
      this.store = sellerNo + '가게 ' + tableNo +' 테이블 주문하기.';
     
   }

   orderPlus(menu){
   
    menu.quantity++;
   
   }
   
   orderMinus(menu){
     
    if(menu.quantity>0){
    menu.quantity--;
    }else{
      alert("최소수량입니다");
    }
   }
    
 order(){
   this.tokenObj = {"token": this.token};
   this.majorObj = {"sellerNo": this.major};
   this.minorObj = {"tableNo": this.minor};
   this.orderContentObj={"orderContent": this.orderContent};

   console.log(this.tokenObj);
   this.menu.push(this.tokenObj);
   this.menu.push(this.majorObj );
   this.menu.push(this.minorObj); 
   this.menu.push(this.orderContentObj); 
 
   console.log(JSON.stringify(this.menu));

    let data = JSON.stringify(this.menu);  
    let link = "http://192.168.0.201:9090/bit902app/order/regist.do";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
  
   
    console.log(data);
    this.http.post(link, data, options)
      .map(res => res.json())
      .subscribe(data=>{
        console.log(data);
      
   
      },error => {
        console.log("error");
      }); 
 }



}
