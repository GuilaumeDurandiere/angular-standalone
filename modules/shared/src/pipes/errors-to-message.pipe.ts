import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  standalone: true,
  name: 'errorsToMessage',
  pure: false,
})
export class ErrorsToMessagePipe implements PipeTransform {

  private errors: Map<string, string> = new Map([
    ['required', $localize`:@@ERROR_REQUIRED:Ce champs est requis`]
  ])

  transform(value: ValidationErrors | null): string[] {
    if (!value) {
      return [];
    }

    return Object.entries(value).map((vals: [string, unknown]) => {
      const key = vals[0];
      return this.getValueByKey(key);
    });
  }

  /**
   * get the translation of 
   * @param key of the validators error
   * @returns traduction
   */
  private getValueByKey(key: string): string {
    let label = 'DEFAULT';

    // if key not in array, log it and return default value
    const hasKey = this.errors.has(key);
    if (!hasKey) {
      console.error(`Could not find any value for key '${key}'`);
    }

    label = this.errors.get(key) ?? '';

    return label;
  }
}