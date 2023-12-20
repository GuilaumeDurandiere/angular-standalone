export abstract class BaseHttpService {
    protected apiUrl: string;
    private environmentApiUrl: string = 'http://localhost:5138/api';
  
    constructor(
      public controllerName: string,
    ) {
      this.apiUrl = `${this.environmentApiUrl}/${controllerName}`;
    }
}