import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'platsorderBy'
})
export class PlatsOrderbyPipe implements PipeTransform {

  transform(selplats:  Array<any>, subj: string): any {
        return selplats.sort(function(a, b){
            //if(a[subj]*a['rf']/11 > b[subj]*b['rf']/11){
            if(a[subj] > b[subj]){
                return -1;
            }
            //else if( a[subj]*a['rf']/11 < b[subj]*b['rf']/11){
            else if( a[subj] < b[subj]){
                return 1;
            }
            else{
                return 0;
            }
        });
  }

}
