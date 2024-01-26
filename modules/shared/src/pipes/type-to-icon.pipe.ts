import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeToIcon',
  standalone: true,
})
export class TypeToIconPipe implements PipeTransform {
  transform(value: string | null): string | undefined {
    if (!value) {
      return ''
    }

    switch (value) {
      case ('image/svg+xml'):
        return '<i class="pi pi-image"></i>'
      case ('pdf'):
        return '<i class="pi pi-file-pdf"></i>'
      default:
        return '<i class="pi pi-question-circle"></i>'
    }
  }
}
