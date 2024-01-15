
interface SubthemeDto {
    libelle: string,
    lienExterne?: string,
    accessibleATous?: boolean,
    description?: string,
    mailReferent?: string,
    icone: string,
    couleur: string,
    workflowTravauxSimplifie?: boolean,
    workflowId?: number,
    refTypeOffreId?: number
};

export interface SubthemeCreateDto extends SubthemeDto {
    themeId: number,
}

export interface SubthemeUpdateDto extends SubthemeDto {
    id: number,
}