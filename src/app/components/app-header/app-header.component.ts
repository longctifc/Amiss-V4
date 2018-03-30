import { Component, TemplateRef, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/message';
import { DatetimeService } from '../../services';
import { CalendarModule } from 'primeng/calendar';
import { ProgressBarModule } from 'primeng/progressbar';
import { SukienService } from '../../services/sukien/sukien.service';
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  providers: [MessageService]
})
export class AppHeaderComponent implements OnInit {
  public modalRef: BsModalRef;
  //date start
  ngayBatDau: Date;
  //date end
  ngayKetThuc: Date;
  //list all lich su hoat dong
  listLichSuHoatDong: any;
  //hien thi thong bao
  msgs: Message[] = [];
  //trang hien tai
  currentPage = 0;
  totalPage = 0;
  //tong so
  totalRows = 0;
  //so ban ghi 1 lan truy van
  numRecs = 20;

  modelLichSuHoatDong: any = [];
  listAllSuKien: any = [];
  modelTaiKhoan = { 'taiKhoan': '', 'tenNguoiDung': '', 'email': '', 'soDienThoai': '', 'diaChi': '', 'maTaiKhoan': '' };
  tennguoidung = "";
  isShowProgress = 0;
  model = { 'matKhauMoi': '', 'matKhauCu': '', 'reMatKhau': '', 'email': '', 'matKhau': '' };
  constructor(private userService: UserService, private modalService: BsModalService, private messageService: MessageService, private dateService: DatetimeService, private sukien: SukienService) {


  }
  ngOnInit() {
    let curUser = this.userService.getCurrentUser();
    this.tennguoidung = curUser.taikhoan;
  }
  logOut() {
    this.userService.logOut();
  }

  doiMatKhau(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
    this.model = { 'matKhauMoi': '', 'matKhauCu': '', 'reMatKhau': '', 'email': '', 'matKhau': '' };
  }
  save() {
    let r = window.confirm('Bạn chắc chắn muốn đổi mật khẩu?');
    if (r) {
      let currentUser = this.userService.getCurrentUser();
      this.userService.doiMatKhau(currentUser.mataikhoan, this.model.matKhau, this.model.matKhauCu).subscribe(response => {
        let _returnData = JSON.parse(response);
        console.log(_returnData);
        if (_returnData.data[0].result == 'wrong_pass') {
          alert('Sai mật khẩu cũ, vui lòng thử lại');
        }
        else if (_returnData.data[0].result.toUpperCase() == 'OK') {
          alert('Đổi mật khẩu thành công');
          this.modalRef.hide();
        }
        else {
          alert('Đổi mật khẩu không thành công, vui lòng thử lại');
        }
      });
    }
  }
  
  getLichSuHoatDong(index) {
    let curUser = this.userService.getCurrentUser();
    if (this.validateInputXemLichSuHoatDong()) {
      this.isShowProgress = 1;
      this.msgs = [];
      this.userService.getLichSuHoatDong(curUser.taikhoan, this.dateService.convertDatetoDateString(this.modelLichSuHoatDong.ngayBatDau), this.dateService.convertDatetoDateString(this.modelLichSuHoatDong.ngayKetThuc), this.modelLichSuHoatDong.loaiLog, index, this.numRecs)
        .subscribe(response => {
          this.listLichSuHoatDong = [];
          let _retData = JSON.parse(response);
          if (_retData.data.length > 0) {
            this.listLichSuHoatDong = _retData.data;
            this.isShowProgress = 0;
            this.totalPage = _retData.data[0].totalpage;
            this.totalRows = _retData.data[0].rowscount;
            this.currentPage = _retData.data[0].pagenum;
          }
          else {
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: 'Thông báo', detail: 'Không có kết quả nào' });
            this.totalPage = 0;
            this.totalRows = 0;
            this.currentPage = 0;
          }
          this.isShowProgress = 0;
        });
    }
    else {
      this.listLichSuHoatDong = [];
      this.isShowProgress = 0;
      this.totalPage = 0;
      this.totalRows = 0;
      this.currentPage = 0;
    }
  }
  validateInputXemLichSuHoatDong() {
    if (this.modelLichSuHoatDong.ngayBatDau == null || this.modelLichSuHoatDong.ngayKetThuc == null) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Vui lòng chọn mốc thời gian' });
      return false;
    }
    else if (this.dateService.calculateTwoDate(this.modelLichSuHoatDong.ngayKetThuc, this.modelLichSuHoatDong.ngayBatDau) > 7) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Chỉ truy xuất tối đa trong khoảng 7 ngày' });
      return false;
    }
    else if (this.dateService.compareTwoDate(this.modelLichSuHoatDong.ngayBatDau, new Date()) == 1) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Ngày bắt đầu không được lớn hơn ngày hiện tại' });
      return false;
    }
    else if (this.dateService.compareTwoDate(this.modelLichSuHoatDong.ngayKetThuc, new Date()) == 1) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Ngày kết thúc không được lớn hơn ngày hiện tại' });
      return false;
    }
    else if (this.dateService.compareTwoDate(this.modelLichSuHoatDong.ngayBatDau, this.modelLichSuHoatDong.ngayKetThuc) == 1) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Ngày bắt đầu không được lớn hơn ngày kết thúc' });
      return false;
    }
    else
      return true;
  }
  openModalLichSuHoatDong(template: TemplateRef<any>) {
    this.modelLichSuHoatDong.loaiLog = -1;
    this.modalRef = this.modalService.show(template); // {3}
    this.modelLichSuHoatDong.ngayBatDau = new Date();
    this.modelLichSuHoatDong.ngayKetThuc = new Date();
    this.sukien.getDanhSachSuKien(-1).subscribe(res => {
      let _retData = JSON.parse(res);
      this.listAllSuKien.push({ loaisukien: -1, tenhienthi: "Tất cả sự kiện" });
      _retData.data.forEach(element => {
        var obj = { loaisukien: element.loaisukien, tenhienthi: element.tenhienthi };
        this.listAllSuKien.push(obj);
      });
      this.getLichSuHoatDong(0);
    });
  }
  openModalThongTinTaiKhoan(template: TemplateRef<any>) {
    let user = this.userService.getCurrentUser();
    this.modalRef = this.modalService.show(template); // {3}
    this.userService.getUserByMaTaiKhoan(user.mataikhoan).subscribe(response => {
      let _response: any = JSON.parse(response);
      this.modelTaiKhoan.taiKhoan = _response.data[0].taikhoan;
      this.modelTaiKhoan.email = _response.data[0].email;
      this.modelTaiKhoan.soDienThoai = _response.data[0].sodienthoai;
      this.modelTaiKhoan.tenNguoiDung = _response.data[0].tennguoidung;
      this.modelTaiKhoan.diaChi = _response.data[0].diachi;
      this.modelTaiKhoan.maTaiKhoan = user.mataikhoan;
    });
  }
  saveThongTinTaiKhoan() {
    let r = window.confirm('Bạn chắc chắn muốn lưu thông tin này?');
    if (r == true) {
      this.userService.editCurrentUser(this.modelTaiKhoan.taiKhoan.trim(),
        this.modelTaiKhoan.tenNguoiDung.trim(), this.modelTaiKhoan.email.trim(),
        this.modelTaiKhoan.soDienThoai.trim(), this.modelTaiKhoan.diaChi == undefined ? '' : this.modelTaiKhoan.diaChi).subscribe(response => {
          let _response: any = JSON.parse(response);
          if (_response.data[0].result.toUpperCase() == "OK") {
            alert("Sửa thông tin tài khoản thành công");
            this.modalRef.hide();
          }
          else {
            alert("Sửa thông tin tài khoản thất bại, vui lòng thử lại");
          }
        });
    }
  }

}
