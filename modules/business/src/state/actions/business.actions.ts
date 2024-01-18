
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BusinessStateActions {

  const prefixAction = '[BusinessState]';

  export class InitThemes {
    static readonly type = `${prefixAction} InitThemes`;
  }

  export class GetSubthemes {
    static readonly type = `${prefixAction} GetSubthemes`;
    constructor(public themeId: number) { }
  }

  export class Reset {
    static readonly type = `${prefixAction} Reset`;
  }
}




