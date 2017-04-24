import { Component, ViewChild,  } from '@angular/core';
import { NavController, NavParams, Card,} from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Something } from './some/path';
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
  private html:string = "" ;
  private menus:string ="";
  private menu:string = "" ;
  private img:string = "";
  private store:string = "";
  private menuFile:string="";
  private major: number = 0;
  private a: number = 0;
  

  data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http : Http ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  buyerList() {
      let link = "http://14.32.66.123:9090/bit902app/book/timeCheck.do";
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
      let sellerNo = 42;
      this.major = sellerNo;
      this.menu = "";
      this.menuFile = "";
      let tableNo = 1;
      let data = sellerNo;
      let link = "http://14.32.66.123:9090/bit902app/menu/list.do";
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      
    
      console.log(data);
      this.http.post(link, data, options)
        .map(res => res.json())
        .subscribe(data=>{
          console.log(data);
  
          this.menu = data.menu;
          this.menuFile = data.menuFile;

        },error => {
          console.log("error");
        }); 
      this.store = sellerNo + '가게 ' + tableNo +' 테이블 주문하기.';
      
   }
   orderPlus(){
          this.a++;
       
   }

   orderMinus(){
     
    if(this.a>0){
    this.a--;
    }else{
      alert("최소수량입니다");
    }
   }
    
    

}
