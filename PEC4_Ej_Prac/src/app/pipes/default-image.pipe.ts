import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
  standalone: true
})
export class DefaultImagePipe implements PipeTransform {
  transform(imageUrl?: string | null): string {
    const trimmed = imageUrl?.trim();
    return trimmed ? trimmed : '/default-article.svg';
  }
}
