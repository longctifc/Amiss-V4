import { Injectable } from '@angular/core';
import { ApiService, UserService } from 'app/services';

@Injectable()
export class QuyenService {
  APIURL = "api/Permission";
  constructor(private api: ApiService,private user:UserService) { 

  }
  getDanhSachQuyen(mataikhoan)
  {
    let curUs = this.user.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_PHANQUYEN.LAY_DS_QUYEN"}',
      "para": '{"v_MATAIKHOAN":"' + mataikhoan + '","v_MATAIKHOAN_THUCHIEN":"' + curUs.mataikhoan + '"}'
    };
    return this.api.Excute("api/ExcuteOracle",param);
  }
  getDanhSachMauQuyen()
  {
    let curUs = this.user.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_PHANQUYEN.LAY_MAU_PHAN_QUYEN"}',
      "para": '{"v_MATAIKHOAN_THUCHIEN":"' + curUs.mataikhoan + '"}'
    };
    return this.api.Excute("api/ExcuteOracle",param);
  }
  setQuyen(mataikhoan,listChucNang)
  {
    let curUs = this.user.getCurrentUser();
    var param = {
      "config": "{\"namesql\":\"PKG_PHANQUYEN.SUA_PHAN_QUYEN\"}", 
      "para": "{\"v_MATAIKHOAN_THUCHIEN\":\""+curUs.mataikhoan+"\", \"v_MATAIKHOAN\":\""+mataikhoan+"\"}",
      "chucnang":listChucNang
    };
    return this.api.Excute(this.APIURL,param);
  }
  getChiTietQuyenByMauQuyen(maMauQuyen)
  {
    let curUs = this.user.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_PHANQUYEN.LAY_MAU_PHAN_QUYEN_CHITIET"}',
      "para": '{"v_MATAIKHOAN_THUCHIEN":"' + curUs.mataikhoan + '","v_MA_MAU_PHANQUYEN":"'+maMauQuyen+'"}'
    };
    return this.api.Excute("api/ExcuteOracle",param);
  }
  setMauPhanQuyenUser(maTaiKhoan,maMauPhanQuyen)
  {
    let curUs = this.user.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_PHANQUYEN.GAN_PHAN_QUYEN"}',
      "para": '{"v_MATAIKHOAN_THUCHIEN":"' + curUs.mataikhoan + '","v_MATAIKHOAN":"'+maTaiKhoan+'","v_MAMAU_PHANQUYEN":"'+maMauPhanQuyen+'"}'

    };
    return this.api.Excute("api/ExcuteOracle",param);
  }

  taoMauQuyen(tenMau,listChucNang)
  {
    let curUs = this.user.getCurrentUser();
    var param = {
      "config": "{\"namesql\":\"PKG_PHANQUYEN.TAO_MAU_PHAN_QUYEN\"}", 
      "para": "{\"v_MATAIKHOAN_THUCHIEN\":\""+curUs.mataikhoan+"\", \"v_TENMAU\":\""+tenMau+"\"}",
      "chucnang":listChucNang
    };
    return this.api.Excute(this.APIURL,param);
  }

  getDanhSachDiemDoPhanQuyen(maTaiKhoan,pageNum,numRecs)
  {
    let curUs = this.user.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_PHANQUYEN.LAY_DS_KHACHHANG_PHAN_QUYEN"}',
      "para": '{"v_MATAIKHOAN_THUCHIEN":"' + curUs.mataikhoan + '","v_MATAIKHOAN":"'+maTaiKhoan+'","v_pagenum":"'+pageNum+'","v_numrecs":"'+numRecs+'"}'
    };
    return this.api.Excute("api/ExcuteOracle",param);
  }

  setPhanQuyenDiemDo(maTaiKhoan,listMeterID)
  {
    let curUs = this.user.getCurrentUser();
    var param = {
      "config": '{"namesql":"PKG_PHANQUYEN.GAN_PHAN_QUYEN_DIEMDO"}',
      "para": '{"v_MATAIKHOAN_THUCHIEN":"' + curUs.mataikhoan + '","v_MATAIKHOAN":"'+maTaiKhoan+'","v_lst_meterid":"'+listMeterID+'"}'
    };
    return this.api.Excute("api/ExcuteOracle",param);
  }

}
