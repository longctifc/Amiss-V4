import { Injectable } from '@angular/core';
import { ApiService } from '../../services/common/api.service';

@Injectable()
export class DanhMucService {

  public listDienLuc: any = Array();
  public listData: any = [];
  APIURL = "api/Directories"
  constructor(public api: ApiService) {
  }
  public getAllDienLuc(idDanhMuc) {
    var param = {
      "config": '{"namesql":"PKG_DANHMUC.LAY_DANHSACH_DANHMUC","connstr":"Amiss42"}',
      "para": '{"v_danhmucid":"'+idDanhMuc+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }

  public getAllTram(idDanhMucCha) {
    var param = {
      "config": '{"namesql":"PKG_DANHMUC.LAY_TATCA_DANHMUC","connstr":"Amiss42"}',
      "para": '{"v_danhmucid":"'+idDanhMucCha+'"}'
    };
    return this.api.Excute(this.APIURL,param);
  }
}
