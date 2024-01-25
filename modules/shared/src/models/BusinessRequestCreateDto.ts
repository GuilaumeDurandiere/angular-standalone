export interface BusinessRequestCreateDto {
  nom: string;
  prenom: string;
  email: string;
  poste: string;
  dateMiseEnService: Date;
  adresse: string;
  nomSite?: string | null;
  description: string;
}