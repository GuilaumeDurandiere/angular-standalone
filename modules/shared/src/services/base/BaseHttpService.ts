export abstract class BaseHttpService {
    protected apiUrl: string;
    private environmentApiUrl: string = 'http://localhost:8080/api';
  
    constructor(
      public controllerName: string,
    ) {
      this.apiUrl = `${this.environmentApiUrl}/${controllerName}`;
    }
}