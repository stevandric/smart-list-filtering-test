import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'globalFilter',
  pure: false
})
export class GlobalFilterPipe implements PipeTransform {
  transform(items: any, args: any): any {
    if (items) {
      if (args.length === 0) {
        return items;
      } else {
        return items.filter(obj => Object.keys(obj).some(
          key => {
            return (obj[key] !== null && obj[key] !== undefined)
            ? obj[key].toString().toLowerCase().includes(args.toLowerCase())
            : null;
          }
          )
        );
      }
    }
  }
}
