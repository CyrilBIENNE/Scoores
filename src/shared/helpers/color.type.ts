export enum ColorType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  WHITE = 'white',
}

export const COLORS = {
  PRIMARY: { title: 'Primary (bleu)', value: undefined },
  SECONDARY: { title: 'Secondary (bleu border)', value: ColorType.SECONDARY },
  WHITE: { title: 'Action (rose)', value: ColorType.WHITE },
}
