import { Pipe, PipeTransform } from '@angular/core';
import { getImagefromBase64 } from '../helpers/images.helper';

@Pipe({
  name: 'base64ToImage',
  standalone: true,
})
export class Base64ToImagePipe implements PipeTransform {
  transform(value: string | null): string | undefined {
    if (!value) {
      return ''
    }
    return getImagefromBase64(value);
  }
}
