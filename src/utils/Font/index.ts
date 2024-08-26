import { ADLaM_Display, Nova_Square, Bungee, Lexend_Deca } from "next/font/google";

const aDLaM_Display = ADLaM_Display({
  subsets: ["latin"],
  weight: ["400"],
});
const nova_Square = Nova_Square({
  subsets: ["latin"],
  weight: ["400"],
});

const bungee = Bungee({
  subsets: ["latin"],
  weight: ["400"],
});

const lexend_Deca_200 = Lexend_Deca({
	weight: '200',
	subsets: ['latin'],
});

const lexend_Deca_300 = Lexend_Deca({
	weight: '300',
	subsets: ['latin'],
});

const lexend_Deca_400 = Lexend_Deca({
	weight: '400',
	subsets: ['latin'],
});

const lexend_Deca_500 = Lexend_Deca({
	weight: '500',
	subsets: ['latin'],
});

const lexend_Deca_600 = Lexend_Deca({
	weight: '600',
	subsets: ['latin'],
});

const lexend_Deca_700 = Lexend_Deca({
	weight: '700',
	subsets: ['latin'],
});

const lexend_Deca_800 = Lexend_Deca({
	weight: '800',
	subsets: ['latin'],
});

const lexend_Deca_900 = Lexend_Deca({
	weight: '900',
	subsets: ['latin'],
});

const lexend_Deca = {
	200: lexend_Deca_200,
	300: lexend_Deca_300,
	400: lexend_Deca_400,
	500: lexend_Deca_500,
	600: lexend_Deca_600,
	700: lexend_Deca_700,
	800: lexend_Deca_800,
	900: lexend_Deca_900,
};

const font = {
  primary: lexend_Deca[400].className,
	secondary: bungee.className,
	tertiary: lexend_Deca,
  quatenary: aDLaM_Display.className,
};

export default font;
