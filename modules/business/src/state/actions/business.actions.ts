
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BusinessStateActions {

  const prefixAction = '[BusinessState]';

  export class InitThemes {
    static readonly type = `${prefixAction} InitThemes`;
  }

  export class getSubthemes {
    static readonly type = `${prefixAction} getSubthemes`;
    constructor(public themeId: number) { }
  }
}



