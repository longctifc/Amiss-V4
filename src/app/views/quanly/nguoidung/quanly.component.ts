import { Component, OnInit, TemplateRef, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { UserService, DanhMucService, DatetimeService } from '../../../../app/services/index';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Jsonp } from '@angular/http';
import { AbstractControl } from '@angular/forms';
import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from "ng-auto-complete";
import { CalendarModule } from 'primeng/calendar';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/message';
import { environment } from 'environments/environment';
import { QuyenService } from '../../../services/quyen/quyen.service';
import { SukienService } from '../../../services/sukien/sukien.service';
import { CheckboxModule } from 'primeng/checkbox';

// export function forbiddenUsername(c: AbstractControl) {
//   const users = ['admin', 'manager'];
//   return (users.includes(c.value)) ? {
//     invalidusername: true
//   } : null;
// }
const userLocalName = environment.localUserName;
@Component({
  selector: 'app-quanly',
  templateUrl: './quanly.component.html',
  styles: [`.modal-dialog {
    width: 939px !important;
  }
  .invalid-feedback{
    display:block;
  }
  .ui-inputtext{
    padding:0.6em!important;
  }
  .ng-autocomplete-dropdown .ng-autocomplete-inputs input{
    padding: 9px !important;
    height: 36px;
  }
  .ng-autocomplete-dropdown .ng-autocomplete-placeholder {
    padding: 5px 3px !important;
  }
  .ng-autocomplete-dropdown-icon:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 7px solid #000;
    position: absolute;
    right: 14px;
    z-index: 999;
    top: 16px;
}
  `],
  providers: [MessageService]
})
export class QuanlyComponent implements OnInit {
  listAllSuKien: any = [];
  maxRow = 1000;
  first = 0;
  isShowProgress = 0;
  isShowProgressDs = 0;

  //bien quan ly modal
  public modalRef: BsModalRef;
  //quan ly cac model tren view
  model: any = [];
  modelLichSuHoatDong: any = [];

  //bien kiem tra da load tab hay chua
  isTabLichSuHoatDong = false;
  isTabPhanQuyenDiemDo = false;
  isTabPhanQuyenChucNang = false;
  //title cua modal
  titleModal = '';
  //quy dinh la panel sua hoac them moi
  isSua: boolean = false;
  //danh sach tat ca nguoi dung
  listUser: any = [];

  //loai log
  loaiLog = 0;
  public group = [
  ];
  //id tai khoan hien tai chon sua
  maTaiKhoanHienTai = 0;
  selected: any = [];
  //tai khoan da lua chon trong tab lich su hoat dong
  idTaiKhoanSelected: any;
  //list all lich su hoat dong
  listLichSuHoatDong: any;
  //id danh muc da chon
  idDanhMuc = 0;
  //cac bien dung cho phan trang
  //tong so trang
  totalPage = 0;
  //tong so
  totalRows = 0;
  //trang hien tai
  currentPage = 0;
  //so ban ghi 1 lan truy van
  numRecs = 20;
  //date start lich su hoat dong
  ngayBatDau: Date;
  //date end lich su hoat dong
  ngayKetThuc: Date;
  //list tai khoan trong tab lich su hoat dong
  listAllTaiKhoan: any = [];
  //list don vi trong modal them moi/sua nguoi dung
  listDonVi: any = [];
  // model trong modal phan quyen chuc nang
  modelPhanQuyenChucNang: any = [];

  modelListPhanQuyenChucNang: any = [];
  //list all quyen trong ds phan quyen
  listDanhSachQuyen: any = [];
  //list ds mau quyen
  listMauQuyen: any = [];
  //tai khoan hien tai dang phan quyen
  maTaiKhoanPhanQuyen = 0;
  //model quan ly list mau phan quyen
  modelMauPhanQuyen: any = [];
  //neu la true thi show nhap ten mau
  isShowTenMau = false;
  //neu la tru thi show progress trong model phan quyen
  isShowProgressPhanQuyen = 0;
  //cho phep sua quyen khi chon chi tiet quyen
  isDisableEdit = false;
  //
  isXemTatCaDiemDo: boolean;
  //tai khoan dang xem lich su hoat dong
  taiKhoanXemLichSuHoatdong = 0;
  //phan trang lich su hoat dong
  //tong so trang
  totalPageLS = 0;
  //tong so
  totalRowsLS = 0;
  //trang hien tai
  currentPageLS = 0;
  //so ban ghi 1 lan truy van
  numRecsLS = 20;
  //neu la true tuc la truy cap thang vao tab, neu la false la tu menu chuc nang
  isDirectTab = true;
  //lis danh sach quyen diem do
  listDSQuyenDiemDo: any = [];
  //list meter id cho phan quyen diem do
  listMeterID: any = [];
  //ma tai khoan dang phan quyen diem do
  currentUserPhanQuyenDiemDo = 0;
  //phan trang phan quyen diem do
  totalPageDD = 0;
  //tong so
  totalRowsDD = 0;
  //trang hien tai
  currentPageDD = 0;
  //so ban ghi 1 lan truy van
  isShowProgressPhanQuyenDiemDo = 0;

  numRecsDD = 20;
  //mang luu cac trang da duoc xem trong phan quyen diem do
  listIndexPageLoaded: any = [];
  //ds tab
  @ViewChild('tabset') tabset: TabsetComponent;
  @ViewChild('dsnguoidung') dsnguoidung: TabDirective;
  @ViewChild('lshoatdong') lshoatdong: TabDirective;
  @ViewChild('phanquyendiemdo') phanquyendiemdo: TabDirective;
  @ViewChild('phanquyenchucnang') phanquyenchucnang: TabDirective;
  msgs: Message[] = [];
  constructor(private user: UserService, private modalService: BsModalService,
    private danhMucService: DanhMucService,
    private dateService: DatetimeService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private quyenService: QuyenService,
    private suKien: SukienService
  ) { }

  ngOnInit() {
    this.getPage(this.first);
    this.getAllDienLuc();
    this.loadTabLichSuHoatDong();
    this.model.donVi = 0;
    this.modelLichSuHoatDong.taiKhoan = -1;
    this.modelLichSuHoatDong.ngayBatDau = new Date();
    this.modelLichSuHoatDong.ngayKetThuc = new Date();
  }

  openModalPhanQuyenChucNang(template: TemplateRef<any>, user) {
    this.isShowProgressPhanQuyen = 1;
    this.isDisableEdit = false;
    this.isShowTenMau = false;
    this.modelPhanQuyenChucNang = user;
    this.modalRef = this.modalService.show(template); // {3}
    this.maTaiKhoanPhanQuyen = user.mataikhoan;
    this.listDanhSachQuyen = [];
    this.quyenService.getDanhSachQuyen(user.mataikhoan).subscribe(res => {
      let retData = JSON.parse(res);
      retData.data.forEach(element => {
        this.listDanhSachQuyen.push({ stt: element.stt, tenchucnang: element.tenchucnang, machucnang: element.machucnang, them: element.them, sua: element.sua, xoa: element.xoa, xem: element.xem });
      });
      this.isShowProgressPhanQuyen = 0;
    });
    this.getDanhSachMauPhanQuyen();
  }

  openModalPhanQuyenDiemDo(template: TemplateRef<any>, user) {
    this.modalRef = this.modalService.show(template); // {3}
    this.currentUserPhanQuyenDiemDo = user.mataikhoan;
    this.getDanhSachDiemDoPhanQuyen(this.currentPageDD);
    this.listIndexPageLoaded = [];
    this.listMeterID = [];
  }

  getDanhSachDiemDoPhanQuyen(index) {
    if (this.listIndexPageLoaded.indexOf(index, 0) === -1) {
      this.listIndexPageLoaded.push(index);
    }
    this.isShowProgressPhanQuyenDiemDo = 1;
    this.quyenService.getDanhSachDiemDoPhanQuyen(this.currentUserPhanQuyenDiemDo, index, this.numRecsDD).subscribe(res => {
      let _retData = JSON.parse(res);
      if (_retData.data.length > 0) {
        //load lan dau
        if (this.listIndexPageLoaded.indexOf(index, 0) < 0) {
          _retData.data.forEach(element => {
            if (element.phanquyen === 1) {
              this.listMeterID.push(element.meterid);
            }
          });
        }
        else {
          _retData.data.forEach(element => {
            //load lan 2
            //neu phan quyen =1 va khong ton tai trong mang list meter id
            if (element.phanquyen === 1 && this.listMeterID.indexOf(element.meterid, 0) < 0) {
              _retData.data[element.rnum - 1].phanquyen = 0;
            }
            if (element.phanquyen === 0 && this.listMeterID.indexOf(element.meterid, 0) > -1) {
              _retData.data[element.rnum - 1].phanquyen = 1;
            }
          });
        }
        this.listDSQuyenDiemDo = _retData.data;
        this.totalPageDD = _retData.data[0].totalpage;
        this.totalRowsDD = _retData.data[0].rowscount;
        this.currentPageDD = _retData.data[0].pagenum;
      }
      else {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Thông báo', detail: 'Không có kết quả nào' });
        this.totalPageDD = 0;
        this.totalRowsDD = 0;
        this.currentPageDD = 0;
      }

      this.isShowProgressPhanQuyenDiemDo = 0;
    });
  }

  openModalSua(template: TemplateRef<any>, id) {
    this.isSua = true;
    this.titleModal = 'Sửa thông tin người dùng';
    this.user.getUserByMaTaiKhoan(id).subscribe(response => {
      let _response: any = JSON.parse(response);
      this.model.taiKhoan = _response.data[0].taikhoan;
      this.model.email = _response.data[0].email;
      this.model.soDienThoai = _response.data[0].sodienthoai;
      this.model.tenNguoiDung = _response.data[0].tennguoidung;
      this.model.diaChi = _response.data[0].diachi;
      this.maTaiKhoanHienTai = _response.data[0].mataikhoan;
      if (_response.data[0].loaitaikhoan == 0) {
        this.isXemTatCaDiemDo = true;
      }
      else {
        this.isXemTatCaDiemDo = false;
      }
      this.model.donVi = _response.data[0].danhmucid;
    });
    this.modalRef = this.modalService.show(template); // {3}
  }
  public openModalThemMoi(template: TemplateRef<any>, id) {
    this.isSua = false;
    this.titleModal = 'Thêm mới thông tin người dùng';
    this.modalRef = this.modalService.show(template); // {3}
    this.model = [];
    this.model.donVi = 0;
    this.isXemTatCaDiemDo = true;
  }
  getAllDienLuc() {
    let curUser = JSON.parse(localStorage.getItem(userLocalName));
    this.danhMucService.getAllDienLuc(curUser.danhmucid).subscribe(response => {
      let dataRet = JSON.parse(response);
      this.listDonVi.push({ danhmucid: 0, tendanhmuc: "Chọn tên danh mục" });
      this.listDonVi.push({ danhmucid: curUser.danhmucid, tendanhmuc: curUser.tendanhmuc });
      dataRet.data.forEach(element => {
        var obj = { danhmucid: element.danhmucid, tendanhmuc: element.tendanhmuc };
        this.listDonVi.push(obj);
      });
    });
  }

  getPage(index) {
    this.isShowProgressDs = 1;
    let mataikhoan = this.user.getMaTaiKhoanCurrentUser();
    this.user.getAllUserByMaTaiKhoan(mataikhoan, index, this.numRecs).subscribe(response => {
      this.isShowProgressDs = 0;
      let dataRet = JSON.parse(response);
      if (dataRet.data.length > 0) {
        this.listUser = dataRet.data;
        this.totalPage = dataRet.data[0].totalpage;
        this.totalRows = dataRet.data[0].rowscount;
        this.currentPage = dataRet.data[0].pagenum;
      }
      else {
        this.listUser = [];
        this.totalPage = 0;
        this.totalRows = 0;
        this.currentPage = 0;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Thông báo', detail: 'Không có kết quả nào' });
      }

    });
  }
  save() {
    console.log(this.isXemTatCaDiemDo);
    if (!this.isSua) {
      this.user.kiemTraTaiKhoan(this.model.taiKhoan.trim()).subscribe(res => {
        let _res = JSON.parse(res);
        if (_res.data[0].count > 0) {
          alert("Tên đăng nhập đã tồn tại, vui lòng thử lại");
        }
        else {
          this.user.createUser(this.model.taiKhoan.trim(),
            this.model.matKhau, this.model.donVi, this.isXemTatCaDiemDo == true ? 0 : 1,
            this.model.tenNguoiDung.trim(), this.model.email.trim(),
            this.model.soDienThoai.trim(), this.model.diaChi == undefined ? '' : this.model.diaChi.trim(), 1).subscribe(response => {
              let _response: any = JSON.parse(response);
              if (_response.data[0].result.toUpperCase() == "OK") {
                alert("Thêm mới thành công");
                this.modalRef.hide();
                this.getPage(0);
                this.model = [];
              }
              else {
                alert("Thêm mới khoản thất bại, vui lòng thử lại");
              }
            });
        }
      });
    }
    else {
      this.user.editUser(this.model.taiKhoan.trim(),
        this.model.tenNguoiDung.trim(), this.model.email.trim(),
        this.model.soDienThoai.trim(), this.model.diaChi == undefined ? '' : this.model.diaChi.trim(), this.model.donVi, this.isXemTatCaDiemDo == true ? 0 : 1).subscribe(response => {
          let _response: any = JSON.parse(response);
          if (_response.data[0].result.toUpperCase() == "OK") {
            alert("Sửa thành công");
            this.getPage(this.currentPage);
            this.modalRef.hide();
            this.model = [];
          }
          else {
            alert("Sửa thông tin tài khoản thất bại, vui lòng thử lại");
            this.modalRef.hide();
            this.model = [];
          }
        });
    }
  }
  public xoaNguoiDung(mataikhoan) {
    let r = window.confirm('Bạn chắc chắn muốn xóa tài khoản này?');
    if (r == true) {
      this.user.deleteUserByMaTaiKhoan(mataikhoan).subscribe(response => {
        let _return = JSON.parse(response);
        if (_return.data[0].result.toUpperCase() == "OK") {
          alert("Xóa thành công");
          this.getPage(this.currentPage);
        }
      });
    } else {

    }
  }
  public moKhoa(mataikhoan) {
    let r = window.confirm('Bạn chắc chắn muốn mở khóa cho tài khoản này?');
    if (r == true) {
      this.user.deleteUserByMaTaiKhoan(mataikhoan).subscribe(response => {
        let _return = JSON.parse(response);
        if (_return.data[0].result.toUpperCase() == "OK") {
          alert("Mở khóa tài khoản thành công");
          this.getPage(this.currentPage);
        }
      });
    }
  }

  loadTabLichSuHoatDong() {
    this.modelLichSuHoatDong.loaiLog = -1;
    // if(taikhoanselected)
    this.isTabLichSuHoatDong = true;
    this.listAllTaiKhoan = [];
    let currentMaTaiKhoan = this.user.getMaTaiKhoanCurrentUser();
    this.user.getAllUserByMaTaiKhoan(currentMaTaiKhoan, this.first, this.maxRow).subscribe(response => {
      let _dataRet = JSON.parse(response);
      this.listAllTaiKhoan.push({ taikhoan: -1, value: "Chọn tài khoản" });
      _dataRet.data.forEach(element => {
        this.listAllTaiKhoan.push({ taikhoan: element.taikhoan, value: element.taikhoan });
      });

    });
    this.suKien.getDanhSachSuKien(-1).subscribe(res => {
      let _retData = JSON.parse(res);
      this.listAllSuKien.push({ loaisukien: -1, tenhienthi: "Tất cả sự kiện" });
      _retData.data.forEach(element => {
        var obj = { loaisukien: element.loaisukien, tenhienthi: element.tenhienthi };
        this.listAllSuKien.push(obj);
      });
    });
  }
  // confirmTabSwitch($event, isDirectTab) {
  //   (this.tabset.tabs).forEach(element => {
  //     if (element.active === true) {
  //       if (element.id == "lshoatdong") {
  //         console.log(123);
  //         this.loadTabLichSuHoatDong();
  //       }
  //       else {
  //         this.msgs = [];
  //       }
  //     }
  //   });
  // }
  selectedTaiKhoan(item: SelectedAutocompleteItem) {
    this.idTaiKhoanSelected = item.item.title;
  }
  selectedDienLuc(item: SelectedAutocompleteItem) {
    this.idDanhMuc = parseInt(item.item.id.toString());
  }

  getLichSuHoatDong(index) {
    if (this.validateInputXemLichSuHoatDong()) {
      this.isShowProgress = 1;
      this.msgs = [];
      this.user.getLichSuHoatDong(this.modelLichSuHoatDong.taiKhoan, this.dateService.convertDatetoDateString(this.modelLichSuHoatDong.ngayBatDau), this.dateService.convertDatetoDateString(this.modelLichSuHoatDong.ngayKetThuc), this.modelLichSuHoatDong.loaiLog, index, this.numRecsLS)
        .subscribe(response => {
          let _retData = JSON.parse(response);
          this.listLichSuHoatDong = [];
          if (_retData.data.length > 0) {
            this.listLichSuHoatDong = _retData.data;
            this.totalPageLS = _retData.data[0].totalpage;
            this.totalRowsLS = _retData.data[0].rowscount;
            this.currentPageLS = _retData.data[0].pagenum;
          }
          else {
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: 'Thông báo', detail: 'Không có kết quả nào' });
            this.totalPageLS = 0;
            this.totalRowsLS = 0;
            this.currentPageLS = 0;
          }
          this.isShowProgress = 0;
        });
    }
    else {
      this.listLichSuHoatDong = [];
      this.isShowProgress = 0;
      this.totalPageLS = 0;
      this.totalRowsLS = 0;
      this.currentPageLS = 0;
    }
  }
  validateInputXemLichSuHoatDong() {
    if (this.modelLichSuHoatDong.taiKhoan === -1) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Vui lòng chọn tài khoản' });
      return false;
    }
    else if (this.modelLichSuHoatDong.loaiLog === null || this.modelLichSuHoatDong.loaiLog === 0) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Vui lòng chọn loại log' });
      return false;
    }
    else if (this.modelLichSuHoatDong.ngayBatDau === null || this.modelLichSuHoatDong.ngayKetThuc === null) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Vui lòng chọn mốc thời gian' });
      return false;
    }
    else if (this.dateService.calculateTwoDate(this.modelLichSuHoatDong.ngayKetThuc, this.modelLichSuHoatDong.ngayBatDau) > 7) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Chỉ truy xuất tối đa trong khoảng 7 ngày' });
      return false;
    }
    else if (this.dateService.compareTwoDate(this.modelLichSuHoatDong.ngayBatDau, new Date()) === 1) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Ngày bắt đầu không được lớn hơn ngày hiện tại' });
      return false;
    }
    else if (this.dateService.compareTwoDate(this.modelLichSuHoatDong.ngayKetThuc, new Date()) === 1) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Ngày kết thúc không được lớn hơn ngày hiện tại' });
      return false;
    }
    else if (this.dateService.compareTwoDate(this.modelLichSuHoatDong.ngayBatDau, this.modelLichSuHoatDong.ngayKetThuc) === 1) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Thông báo', detail: 'Ngày bắt đầu không được lớn hơn ngày kết thúc' });
      return false;
    }
    else
      return true;
  }
  resetMatKhau(mataikhoan) {
    this.user.resetMatKhau(mataikhoan).subscribe(response => {
      let _response: any = JSON.parse(response);
      if (_response.data[0].result.toUpperCase() == "OK") {
        alert('Reset mật khẩu thành công');
      }
      else {
        alert('Reset mật khẩu thất bại, vui lòng thử lại');
      }
    });
  }
  savePhanQuyenChucNang() {
    if (this.isDisableEdit == true) {
      this.quyenService.setMauPhanQuyenUser(this.maTaiKhoanPhanQuyen, this.modelMauPhanQuyen.mauQuyen).subscribe(res => {
        let _return = JSON.parse(res);
        if (_return.data[0].result.toUpperCase() === "OK") {
          alert('Gán quyền theo mẫu thành công');
          this.modalRef.hide();
        }
        else {
          alert('Gán quyền theo mẫu thất bại');
        }
      });
    }
    else {
      if (this.isShowTenMau == true) {
        let listPhanQuyen: any = [];
        for (var i = 0; i < this.listDanhSachQuyen.length; i++) {
          var objQuyen = {
            "MACHUCNANG": this.listDanhSachQuyen[i].machucnang,
            "THEM": this.listDanhSachQuyen[i].them,
            "SUA": this.listDanhSachQuyen[i].sua,
            "XOA": this.listDanhSachQuyen[i].xoa,
            "XEM": this.listDanhSachQuyen[i].xem
          };
          listPhanQuyen.push(objQuyen);
        }
        this.quyenService.taoMauQuyen(this.modelMauPhanQuyen.tenMau, listPhanQuyen).subscribe(res => {
          let _return = JSON.parse(res);
          console.log(_return.data);
          if (_return.result.toUpperCase() === "EXIST") {
            alert('Tên mẫu đã tồn tại, vui lòng chọn tên khác');
          }
          else if (_return.result.toUpperCase() === "OK") {
            let maMauQuyen = _return.data[0].mamau;
            this.quyenService.setMauPhanQuyenUser(this.maTaiKhoanPhanQuyen, maMauQuyen).subscribe(res => {
              let _return = JSON.parse(res);
              if (_return.data[0].result.toUpperCase() === "OK") {
                alert('Tạo mẫu và phân quyền thành công');
                this.modalRef.hide();
              }
              else {
                alert('Phân quyền không thành công, vui lòng thử lại');
              }
            });
          }
          else {
            alert('Có lỗi xảy ra, vui lòng thử lại');
          }
        });
      }
      else {
        let listPhanQuyen: any = [];
        for (var i = 0; i < this.listDanhSachQuyen.length; i++) {
          var objQuyen = {
            "MACHUCNANG": this.listDanhSachQuyen[i].machucnang,
            "THEM": this.listDanhSachQuyen[i].them,
            "SUA": this.listDanhSachQuyen[i].sua,
            "XOA": this.listDanhSachQuyen[i].xoa,
            "XEM": this.listDanhSachQuyen[i].xem
          };
          listPhanQuyen.push(objQuyen);
        }
        this.quyenService.setQuyen(this.maTaiKhoanPhanQuyen, listPhanQuyen).subscribe(res => {
          let _return = JSON.parse(res);
          if (_return.data[0].result.toUpperCase() === "OK") {
            alert('Phân quyền thành công');
            this.modalRef.hide();
          }
          else {
            alert('Phân quyền thất bại');
          }
        });
      }
    }
  }
  onClicked(value, index, loai) {
    if (loai == 1) {
      this.listDanhSachQuyen[index - 1].xem = value;
    }
    else if (loai == 2) {
      this.listDanhSachQuyen[index - 1].them = value;
    }
    else if (loai == 3) {
      this.listDanhSachQuyen[index - 1].sua = value;
    }
    else if (loai == 4) {
      this.listDanhSachQuyen[index - 1].xoa = value;
    }
  }
  getDanhSachMauPhanQuyen() {
    this.quyenService.getDanhSachMauQuyen().subscribe(res => {
      let _return = JSON.parse(res);
      this.listMauQuyen = [];
      this.listMauQuyen.push({ "ma_mau_phanquyen": -1, "ten": "Chọn mẫu phân quyền" });
      _return.data.forEach(element => {
        this.listMauQuyen.push({ "ma_mau_phanquyen": element.ma_mau_phanquyen, "ten": element.ten });
      });
      this.modelMauPhanQuyen.mauQuyen = -1;
    });
  }
  getChiTietQuyenByQuyen() {
    if (this.modelMauPhanQuyen.mauQuyen != -1) {
      this.isShowTenMau = false;
      this.isShowProgressPhanQuyen = 1;
      this.listDanhSachQuyen = [];
      this.quyenService.getChiTietQuyenByMauQuyen(this.modelMauPhanQuyen.mauQuyen).subscribe(res => {
        let listQuyen = JSON.parse(res);
        listQuyen.data.forEach(element => {
          this.listDanhSachQuyen.push({ stt: element.stt, tenchucnang: element.tenchucnang, machucnang: element.machucnang, them: element.them, sua: element.sua, xoa: element.xoa, xem: element.xem });
        });
        this.isShowProgressPhanQuyen = 0;
      });
      this.isDisableEdit = true;
    }
    else {
      this.isShowTenMau = false;
      this.isDisableEdit = false;
      this.listDanhSachQuyen = [];
      this.quyenService.getDanhSachQuyen(this.maTaiKhoanPhanQuyen).subscribe(res => {
        let retData = JSON.parse(res);
        retData.data.forEach(element => {
          this.listDanhSachQuyen.push({ stt: element.stt, tenchucnang: element.tenchucnang, machucnang: element.machucnang, them: element.them, sua: element.sua, xoa: element.xoa, xem: element.xem });
        });
        this.isShowProgressPhanQuyen = 0;
      });
    }

  }
  taoMauPhanQuyen() {
    this.isShowTenMau = true;
    this.isDisableEdit = false;
  }
  huyTaoMau() {
    this.isShowTenMau = false;
    this.isDisableEdit = true;
  }
  openTabLichSuHoatDong(template: TemplateRef<any>, user) {
    this.msgs = [];
    this.loadTabLichSuHoatDong();
    (this.tabset.tabs).forEach(element => {
      if (element.id == "lshoatdong") {
        element.active = true;
      }
    });
    this.modelLichSuHoatDong.ngayBatDau = new Date();
    this.modelLichSuHoatDong.ngayKetThuc = new Date();
    this.taiKhoanXemLichSuHoatdong = user.taikhoan;
    this.modelLichSuHoatDong.taiKhoan = user.taikhoan;
    this.getLichSuHoatDong(0);
  }
  changePhanQuyen(index, meterid, phanquyen) {
    if (phanquyen == 1) {
      this.listDSQuyenDiemDo[index - 1].phanquyen = 0;
      let indexitem = this.listMeterID.indexOf(meterid, 0);
      if (index > -1) {
        this.listMeterID.splice(indexitem, 1);
      }
    }
    else {
      this.listDSQuyenDiemDo[index - 1].phanquyen = 1;
      this.listMeterID.push(meterid);
    }
  }
  savePhanQuyenDiemDo() {
    if (this.listMeterID.length === 0) {
      let isOK = confirm("Không phân quyền điểm đo nào cho tài khoản này?");
      if (isOK) {
        this.modalRef.hide();
      }
    }
    else {
      let strListMeterID = '';
      this.listMeterID.forEach(element => {
        strListMeterID += element + ',';
      });
      this.quyenService.setPhanQuyenDiemDo(this.currentUserPhanQuyenDiemDo, strListMeterID).subscribe(res => {
        let _return = JSON.parse(res);
        if (_return.data[0].result.toUpperCase() === "OK") {
          alert("Phân quyền điểm đo thành công");
          this.modalRef.hide();
        }
        else {
          alert("Phân quyền điểm đo không thành công, vui lòng thử lại");
        }
      });
    }
  }
}
