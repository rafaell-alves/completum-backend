export interface ChampionData {
  type: string;
  format: string;
  version: string;
  data: {
    [championKey: string]: Champion;
  };
}

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tags: string[];
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  // Outros campos podem ser adicionados conforme necessário
}
