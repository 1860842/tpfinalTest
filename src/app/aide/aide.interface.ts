export interface Vue {
  nom: string;
  fonctionnalite: string;
  composants: { [key: string]: string };
  fonctionnement: string[];
}

export interface Aide {
  nom: string;
  description: string;
  vues: { [key: string]: Vue };
}

export interface AideLangue {
  [key: string]: Aide;
}
