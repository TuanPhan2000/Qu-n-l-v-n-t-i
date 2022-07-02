import { HttpParams } from '@angular/common/http';
import { RequestParam } from '../data/request-param';

export class ParamUtil {

  public static toRequestParams(obj: any) {
    const params: RequestParam[] = [];

    Object.keys(obj).forEach(key => {
      if(key){
        // console.log(key);
        params.push(new RequestParam(key, obj[key]));
        // console.log("acds" + obj[key]);
      }
    })
    return params;
  }
}
