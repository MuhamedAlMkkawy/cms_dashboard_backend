import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Detect requested language
    const rawLang =
      request.query.lang || request.headers['accept-language'] || '';
    const selectedLang = rawLang
      .toString()
      .toLowerCase()
      .split(',')[0]
      .split('-')[0];

    // Recursive function to localize multilingual fields
    const localize = (obj: any): any => {
      if (Array.isArray(obj)) return obj.map(localize);

      if (
        !obj ||
        typeof obj !== 'object' ||
        obj instanceof Date ||
        obj.constructor?.name === 'ObjectId'
      ) {
        return obj;
      }

      const result: any = {};

      for (const [key, value] of Object.entries(obj)) {
        // Skip _id
        if (key === '_id') {
          result[key] = value;
          continue;
        }

        // If value is an object and has dynamic languages
        if (
          value &&
          typeof value === 'object' &&
          Object.keys(value).every((k) => typeof value[k] === 'string')
        ) {
          // Check if requested language exists in object keys
          if (selectedLang && value[selectedLang]) {
            result[key] = value[selectedLang];
          } else {
            result[key] = value; // fallback: return full object
          }
        } else {
          // Otherwise, recurse
          result[key] = localize(value);
        }
      }

      return result;
    };

    return next.handle().pipe(
      map((response) => {
        if (!response) return response;

        // ADD THIS: Skip i18n responses
        // If response has a 'message' field that looks like i18n result
        if (response.message && typeof response.message === 'string') {
          // If it's already a translated string, don't process it
          return response;
        }

        // Also skip if it's a standard i18n/AuthService response structure
        if (response.status && response.message) {
          return response;
        }

        // Handle `data` inside standard response structure
        if (response.data) {
          if (Array.isArray(response.data)) {
            response.data = response.data.map(localize);
          } else {
            response.data = localize(response.data);
          }
        } else {
          response = localize(response);
        }

        return response;
      }),
    );
  }
}
