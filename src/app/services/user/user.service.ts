import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../services/common/api.service';
import { Jsonp } from '@angular/http';
@Injectable()

export class UserService {
  data: any = {};
  datanew: any = {};
  
  constructor(private router: Router, private api: ApiService) { 

  }
  APIURL = "api/ExcuteOracle";
  //dang nhap
  login(taiKhoan, matKhau) {
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.DANGNHAP"}',
      "para": '{"v_TAIKHOAN":"' + taiKhoan + '","v_MATKHAU":"' + matKhau + '"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
  checkLoggedIn() {
    //sonnt: neu kiem tra chua co thong tin trong local storage --> tra ve false 
    if (localStorage.getItem("UserInfo") == null || localStorage.getItem("UserInfo") == undefined) {
      return false;
    }
    else {
      //sonnt:neu co tra ve true
      return true;
    }
  }

  //sua thong tin nguoi dung
  editCurrentUser(taiKhoan, tenNguoiDung, email, soDienThoai, diaChi) {
    let curentUser = this.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.SUA_TT_CURRENT_NGUOI_DUNG"}',
      "para": '{"v_TAIKHOAN":"' + taiKhoan + '","v_TENNGUOIDUNG":"' + tenNguoiDung + '","v_EMAIL":"' + email + '","v_SODIENTHOAI":"' + soDienThoai + '","v_DIACHI":"' + diaChi + '","v_MATAIKHOAN_THUCHIEN":"'+curentUser.mataikhoan+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
  //sua thong tin nguoi dung
  editUser(taiKhoan, tenNguoiDung, email, soDienThoai, diaChi,danhMucID,loaiTaiKhoan) {
    let curentUser = this.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.SUA_TT_NGUOI_DUNG"}',
      "para": '{"v_TAIKHOAN":"' + taiKhoan + '","v_TENNGUOIDUNG":"' + tenNguoiDung + '","v_EMAIL":"' + email + '","v_SODIENTHOAI":"' + soDienThoai + '","v_DIACHI":"' + diaChi + '","v_MATAIKHOAN_THUCHIEN":"'+curentUser.mataikhoan+'","v_DANHMUCID":"'+danhMucID+'","v_LOAITAIKHOAN":"'+loaiTaiKhoan+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }

  //lay danh sach nhung nguoi dung dang quan ly
  getAllUserByMaTaiKhoan(mataikhoan,pageNum, numRecs) {
    let curentUser = this.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.LAY_DANHSACH_TAIKHOAN"}',
      "para": '{"v_MATAIKHOAN ":"'+mataikhoan+'","v_pagenum":"' + pageNum + '","v_numrecs":"' + numRecs + '","v_MATAIKHOAN_THUCHIEN":"'+curentUser.mataikhoan+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
  //them moi nguoi dungs
  createUser(taiKhoan, matKhau, idDanhMuc, loaiTaiKhoan, tenNguoiDung, email, soDienThoai, diaChi, hienThi) {
    let curentUser = this.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.THEM_MOI_NGUOI_DUNG"}',
      "para": '{"v_TAIKHOAN":"' + taiKhoan + '","v_MATKHAU":"' + matKhau + '","v_DANHMUCID":"' + idDanhMuc + '","v_LOAITAIKHOAN":"' + loaiTaiKhoan + '","v_TENNGUOIDUNG":"' + tenNguoiDung + '","v_EMAIL":"' + email + '","v_SODIENTHOAI":"' + soDienThoai + '","v_DIACHI":"' + diaChi + '","v_HIENTHI":"' + hienThi + '","v_MATAIKHOAN_THUCHIEN":"'+curentUser.mataikhoan+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
  //lay thong tin user theo ma tai khoan
  getUserByMaTaiKhoan(mataikhoan) {
    let curentUser = this.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.LAY_TT_TAIKHOAN"}',
      "para": '{"v_MATAIKHOAN":"' + mataikhoan + '","v_MATAIKHOAN_THUCHIEN":"'+curentUser.mataikhoan+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
//xoa tai khoan
  deleteUserByMaTaiKhoan(mataikhoan) {
    let curentUser = this.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.XOA_TAIKHOAN"}',
      "para": '{"v_MATAIKHOAN":"' + mataikhoan + '","v_MATAIKHOAN_THUCHIEN":"'+curentUser.mataikhoan+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
  //mo khoa tai khoan
  moKhoaUserByMaTaiKhoan(mataikhoan) {
    let curentUser = this.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.MOKHOA_TAIKHOAN "}',
      "para": '{"v_MATAIKHOAN":"' + mataikhoan + '","v_MATAIKHOAN_THUCHIEN":"'+curentUser.mataikhoan+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
  //lay tai khoan dang dang nhap
  getCurrentUser()
  {
    let currentUser = JSON.parse(localStorage.getItem("UserInfo"));
    return currentUser;
  }
  //lay ma tai khoan cua nguoi dang dang nhap
  getMaTaiKhoanCurrentUser()
  {
    let currentUser = this.getCurrentUser();
    return currentUser.mataikhoan;
  }
  //lay lich su hoat dong 
  getLichSuHoatDong(taikhoan,tungay,denngay,loaisukien,pageNum,numRecs) {
    let curentUser = JSON.parse(localStorage.getItem("UserInfo"));
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.LAY_LICHSU_HOATDONG"}',
      "para": '{"v_TAIKHOAN":"' + taikhoan + '","v_TUNGAY":"'+tungay+'","v_TOINGAY":"'+denngay+'","v_LOAISUKIEN":"'+loaisukien+'","v_pagenum":"'+pageNum+'","v_numrecs":"'+numRecs+'","v_MATAIKHOAN_THUCHIEN":"'+curentUser.mataikhoan+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
  //dang xuat
  logOut()
  {
    localStorage.removeItem("UserInfo");
    this.router.navigate(['/pages/login']);
  }
  //doi mat khau
  doiMatKhau(mataikhoan,matkhaumoi,matkhaucu)
  {
    let curentUser = this.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.THAYDOI_MATKHAU"}',
      "para": '{"v_MATAIKHOAN":"' + mataikhoan + '","v_MATKHAUMOI":"'+matkhaumoi+'","v_MATKHAUCU":"'+matkhaucu+'","v_MATAIKHOAN_THUCHIEN":"'+curentUser.mataikhoan+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
  //reset mat khaus
  resetMatKhau(mataikhoan)
  {
    let curentUser = this.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.RESET_MATKHAU"}',
      "para": '{"v_MATAIKHOAN":"' + mataikhoan + '","v_MATAIKHOAN_THUCHIEN":"'+curentUser.mataikhoan+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
  //kiem tra tai khoan co trung trong db hay khong
  kiemTraTaiKhoan(taikhoan)
  {
    let curentUser = this.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.KIEMTRA_TAIKHOAN"}',
      "para": '{"v_TAIKHOAN":"' + taikhoan + '","v_MATAIKHOAN_THUCHIEN":"'+curentUser.mataikhoan+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
}
