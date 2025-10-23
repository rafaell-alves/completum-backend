export interface ItemData {
  type: string;
  format: string;
  version: string;
  data: {
    [itemKey: number]: Item;
  };
}

export interface Item {
  name: string;
  plaintext: string;
  image: {
    full: string;
    sprite?: string | null;
    group?: string | null;
    x?: number | null;
    y?: number | null;
    w?: number | null;
    h?: number | null;
  };
}
