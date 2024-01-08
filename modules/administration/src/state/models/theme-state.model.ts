import { PaginationData, PaginationDto, Theme } from "@te44-front/shared";

export interface ThemeStateModel {
  themes: PaginationDto<Theme> | null;
  workflow: { libelle: string, id: number }[];
  pagination: PaginationData;
}
