import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxlengthdoc'
})


export class MaxlengthdocPipe implements PipeTransform {

    transform(doc: string, howMany: number) {

        if (doc.length >= howMany) {
            return doc.substring(0, howMany) + "...";
         } else {
             return doc;
         }
    }
}