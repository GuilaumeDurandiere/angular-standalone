import { PaginationData, SubThemeFormValue, ThemeFormValue } from "@te44-front/shared";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ThemeStateActions {

  const prefixAction = '[ThemeState]';
  ;

  export class InitWorflow {
    static readonly type = `${prefixAction} InitWorflow`;
  }

  export class DeleteTheme {
    static readonly type = `${prefixAction} DeleteTheme`;
    constructor(public themeId: number) { }
  }

  export class DeleteSubtheme {
    static readonly type = `${prefixAction} DeleteSubtheme`;
    constructor(public subthemeId: number) { }
  }

  export class InitTheme {
    static readonly type = `${prefixAction} InitTheme`;
    constructor(public id: number) { }
  }

  export class LoadPageData {
    static readonly type = `${prefixAction} LoadPageData`;
    constructor(public paginationData: PaginationData) { }
  }

  export class Create {
    static readonly type = `${prefixAction} Create`;
    constructor(public themeFormValue: ThemeFormValue) { }
  }

  export class CreateSubtheme {
    static readonly type = `${prefixAction} CreateSubtheme`;
    constructor(public subthemeFormValue: SubThemeFormValue, public themeId: number) { }
  }

  export class Update {
    static readonly type = `${prefixAction} Update`;
    constructor(public themeFormValue: ThemeFormValue, public themeId: number) { }
  }

  export class UpdateSubtheme {
    static readonly type = `${prefixAction} UpdateSubtheme`;
    constructor(public subthemeFormValue: SubThemeFormValue, public subthemeId: number) { }
  }

  export class Refresh {
    static readonly type = `${prefixAction} Refresh`;
  }

  export class RefreshSubtheme {
    static readonly type = `${prefixAction} RefreshSubtheme`;
  }
}



