import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'boolToString',
  pure: false,
})
export class BoolToStringPipe implements PipeTransform {

  transform(value: unknown): string {
    return value ? $localize`:@@ACTIVATED:Actif` : $localize`:@@DESACTIVATED:Inactif`;
  }
}
