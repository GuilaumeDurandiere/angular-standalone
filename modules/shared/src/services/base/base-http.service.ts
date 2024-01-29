export abstract class BaseHttpService {
  protected apiUrl: string;
  private environmentApiUrl: string = 'http://localhost:8080/api';

  constructor(
    public controllerName: string,
  ) {
    this.apiUrl = `${this.environmentApiUrl}/${controllerName}`;
  }

  /**
  * Build searched/sorted paginated request for backend
  * @param page number
  * @param size number
  * @param action string, extended route/path for url
  * @returns string to send
  */
  buildPaginatedRequest(page: number, size: number, action?: string, sortField?: string, sortOrder?: string): string {
    // Build base of url by checking if an action is needed
    size = size === 0 ? 1 : size;
    let tempUrl = action ? `${this.apiUrl}/${action}` : `${this.apiUrl}`;

    tempUrl += `?page=${page}&size=${size}`

    if (sortField && sortOrder) {
      tempUrl += `&sortColumn=${sortField}&sortOrder=${sortOrder}`
    }

    return tempUrl;
  }
}