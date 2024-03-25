import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'category',
    standalone: true
})
export class CategoryPipe implements PipeTransform {
 /**Obs: Exportar a class no Module */
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(value: string): string {

    switch (value) {
      case 'front-end': return 'code';
      case 'back-end': return 'computer';
    }
    return 'code';

  }

}
