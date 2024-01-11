import { PaginationData, ThemeFormValue } from "@te44-front/shared";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ThemeStateActions {

  export class InitWorflow {
    static readonly type = `[ThemeState] InitWorflow`;
  }

  export class LoadPageData {
    static readonly type = `[ThemeState] LoadPageData`;
    constructor(public paginationData: PaginationData) { }
  }

  export class Create {
    static readonly type = `[ThemeState] Create`;
    constructor(public themeFormValue: ThemeFormValue) { }
  }

  export class Refresh {
    static readonly type = `[ThemeState] Refresh`;
  }
}



