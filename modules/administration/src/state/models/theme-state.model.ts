import { PaginationData, PaginationDto, Theme } from "@te44-front/shared";

export interface ThemeStateModel {
  themes: PaginationDto<Theme> | null;
  pagination: PaginationData;
}
