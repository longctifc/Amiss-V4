import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common'

@Injectable()
export class DatetimeService {

  constructor(private datePipe: DatePipe) { }
  //truyen vao ngay bat dau (datetime), so ngay muon tru, tra ve ngay hop le
  addDateTime(ngayBatDau, soNgayTru) {
    var dateOffset = (24 * 60 * 60 * 1000) * soNgayTru; //5 days
    var result = ngayBatDau.getTime() + dateOffset;
    return result;
  }

  //tu date chuyen thanh string dinh dang dd/mm/yyyy
  convertDatetoDateString(dateInput) {
    var date = new Date(dateInput);
    let _return = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " 00:00:00";
    return _return;
  }
  // tinh khoang canh giua 2 
  calculateTwoDate(dateInput1, dateInput2) {
    var date1 = new Date(dateInput1);
    var date2 = new Date(dateInput2);
    let result = (date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000);
    return result;
  }
  //so sanh 2 ngay voi nhau, tra ve 1 neu lon hon; -1 neu nho hon, 0 la bang nhau
  compareTwoDate(dateInput1:Date, dateInput2:Date) {
    var date1 = new Date(dateInput1.getFullYear(),(dateInput1.getMonth()+1),dateInput1.getDate(),0,0,0,0);
    var date2 = new Date(dateInput2.getFullYear(),(dateInput2.getMonth()+1),dateInput2.getDate(),0,0,0,0);
    if (date1 < date2) {
      return -1
    }
    else if (date1 > date2) {
      return 1;
    }
    else
    {
      return 0;
    }
      
  }

}
