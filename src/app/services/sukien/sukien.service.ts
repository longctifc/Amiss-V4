import { Injectable } from '@angular/core';
import { ApiService } from '../../services/common/api.service';

@Injectable()
export class SukienService {

  APIURL = "api/ExcuteOracle";
  constructor(private api:ApiService) { 

  }

  getDanhSachSuKien(sukien) {
    var param = {
      "config": '{"namesql":"PKG_TAIKHOAN.LAY_DANHMUC_HOATDONG"}',
      "para": '{"v_SUKIEN":"' + sukien + '"}'
    };
    return this.api.Excute(this.APIURL,param);
  }

}
