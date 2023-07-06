export const colors = {
  mainLogoColor: '#3173f6',
  mainSkyBlue100: '#99d6ff',
  mainSkyBlue200: '#17b9ff',
  mainSkyBlue300: '#019cff',
  mainSkyBlue400: '#2b90d9',
  mainPastelBlue100: '#c5dff8',
  mainPastelBlue200: '#a0bfe0',
  mainPastelBlue300: '#7895cb',
  mainPastelBlue400: '#4a55a2',
  mainBlackColor: '#000000',
  mainLightBlack100: '#282c37',
  mainLightBlack200: '2b2b2b',
  mainWhiteColor: '#ffffff',
  mainGrayBlue: '#9baec8',
  mainLightGray: '#d9e1e8',
  mainBlueGreen: '#1f4e5f',
  mainLightGray100: '#FDFDFD',
  mainLightGray200: '#F8F7F7',
  mainLightGray300: '#D9D9D9',
  mainLightGray400: '#ADACAC',
  mainLightRed100: '#FD8F8F',
};

export const cursors = {
  pointer: 'cursor: pointer',
};

export interface ITheme {
  colors: typeof colors;
  cursors: typeof cursors;
}

export const theme: ITheme = {
  colors,
  cursors,
};
