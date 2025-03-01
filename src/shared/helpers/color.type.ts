export enum ColorType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ACTION = 'action',
  WHITE = 'white',
}

export const COLORS = {
  PRIMARY: { title: 'Primary (bleu)', value: undefined },
  SECONDARY: { title: 'Secondary (bleu border)', value: ColorType.SECONDARY },
  ACTION: { title: 'Secondary (bleu border)', value: ColorType.ACTION },
  WHITE: { title: 'Action (rose)', value: ColorType.WHITE },
}
