import React from 'react';

import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/solid";


import {
    Navbar,
    Typography,
    IconButton,
    Collapse,
    Badge,
  } from "@material-tailwind/react";
import { NavLink } from 'react-router-dom';
import { ABOUT_COFFEE, HOME_PAGE, JS_BARISTA, RECIPES, SHOP_USER } from '../utils/consts';

const Header = () => {

    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setOpenNav(false),
        );
      }, []);

      const navList = (
        <ul className="mt-4 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

          <Typography
            as="li"
            variant="h6"
            color="blue-gray"
            className="text-sm font-semibold hover:text-red-800"
          >
            <a href={SHOP_USER} className="flex items-center">
            Магазин
            </a>
          </Typography>
          
          <Typography
            as="li"
            variant="h6"
            color="blue-gray"
            className="text-sm font-semibold hover:text-red-800"
          >
            <a href={JS_BARISTA} className="flex items-center">
              Школа бариста
            </a>
          </Typography>
          <Typography
            as="li"
            variant="h6"
            color="blue-gray"
            className="text-sm font-semibold hover:text-red-800"
          >
            <a href={RECIPES} className="flex items-center">
              Рецепты
            </a>
          </Typography>
          <Typography
            as="li"
            variant="h6"
            color="blue-gray"
            className="text-sm font-semibold hover:text-red-800"
          >
            <a href={ABOUT_COFFEE} className="flex items-center">
              Энциклопедия
            </a>
          </Typography>
        </ul>
      );

      const topNavList = (
        <div className='flex flex-col gap-2 text-gray-800'>
        <ul className='mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 text-sm'>
            <li>О нас</li>
            <li>Оплата и доставка</li>
            <li>Опт</li>
            <li>Контакты</li>
        </ul>
        <div className='text-md cursor-text text-gray-600 mb-5'>
        Call-центр: +998(99)000-00-00
        </div>
        </div>
      );

        return (
          <div className="bg-white">
              <Navbar className="sticky h-full shadow-sm z-10 mx-auto max-w-screen-xl 2xl:max-w-screen-2xl rounded-none px-4 2xl:px-0 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                  <Typography
                    as="a"
                    href={HOME_PAGE}
                    className="cursor-pointer font-medium flex items-center"
                  >  {/*LOGO CRG */}
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="35" height="35" viewBox="0 0 374.000000 375.000000"
                    preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,375.000000) scale(0.100000,-0.100000)"
                    fill="#BA181B" stroke="none">
                    <path d="M1670 3729 c-623 -66 -1182 -454 -1464 -1017 -97 -193 -164 -414
                    -185 -607 -13 -115 -17 -367 -7 -440 12 -90 48 -280 56 -296 4 -8 15 -44 24
                    -80 20 -76 92 -231 170 -363 270 -458 727 -782 1251 -886 140 -28 429 -38 572
                    -20 419 52 793 244 1100 564 480 499 644 1235 422 1901 -231 694 -810 1161
                    -1544 1245 -102 11 -284 11 -395 -1z m375 -39 c-3 -5 -17 -10 -30 -10 -13 0
                    -27 5 -30 10 -4 6 8 10 30 10 22 0 34 -4 30 -10z m-955 -164 c0 -2 -7 -7 -16
                    -10 -8 -3 -12 -2 -9 4 6 10 25 14 25 6z m1600 -12 l25 -15 -25 7 c-14 3 -32
                    10 -40 15 -13 7 -13 8 0 8 8 0 26 -6 40 -15z m118 -129 c-6 -31 7 -41 30 -24
                    9 7 14 9 10 5 -4 -5 -3 -15 4 -23 8 -11 7 -17 -8 -28 -24 -18 -31 -18 -38 0
                    -3 8 -12 15 -20 15 -26 0 -3 79 23 80 2 0 1 -11 -1 -25z m122 -38 c0 -27 -19
                    -10 -25 22 -3 19 -2 21 10 11 8 -7 15 -22 15 -33z m-668 11 c-7 -7 -12 -25
                    -12 -40 0 -15 -4 -28 -10 -28 -5 0 -10 18 -10 40 0 35 3 40 22 40 17 0 19 -3
                    10 -12z m94 -54 c-5 -26 -10 -34 -18 -26 -8 8 -7 20 2 42 16 39 24 31 16 -16z
                    m-156 26 c0 -5 -4 -10 -10 -10 -5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10
                    -10z m884 -86 c4 -9 4 -19 2 -21 -8 -8 -26 8 -26 23 0 19 16 18 24 -2z m-845
                    -38 c16 -17 22 -33 19 -57 -3 -37 -4 -37 -108 -28 -43 4 -45 3 -67 -37 -13
                    -24 -24 -62 -25 -90 l-3 -49 37 -3 c71 -6 73 -62 2 -62 -41 0 -64 -22 -65 -63
                    -2 -58 -9 -131 -19 -199 -5 -37 -10 -87 -10 -112 0 -39 3 -46 20 -46 13 0 20
                    -7 20 -19 0 -15 -13 -24 -52 -37 -29 -9 -70 -25 -90 -35 -21 -11 -44 -19 -53
                    -19 -29 0 -15 39 30 77 l44 38 10 108 c6 60 18 150 26 200 15 86 15 92 -1 104
                    -23 17 -68 17 -82 1 -11 -14 -28 -122 -37 -243 -8 -116 -29 -171 -86 -226 -63
                    -61 -129 -93 -176 -86 -76 13 -97 70 -39 106 37 23 67 26 97 11 24 -13 72 10
                    96 47 18 27 22 50 47 240 8 62 16 121 18 130 2 14 -5 19 -34 21 -58 5 -48 42
                    15 57 32 8 47 38 47 90 0 50 37 141 67 165 27 21 107 28 118 10 18 -29 43 -29
                    81 0 52 39 119 42 153 6z m96 4 c-3 -5 -10 -10 -16 -10 -5 0 -9 5 -9 10 0 6 7
                    10 16 10 8 0 12 -4 9 -10z m540 -20 c3 -5 -1 -10 -9 -10 -9 0 -16 5 -16 10 0
                    6 4 10 9 10 6 0 13 -4 16 -10z m-435 -25 c0 -8 -4 -17 -10 -20 -6 -4 -10 5
                    -10 20 0 15 4 24 10 20 6 -3 10 -12 10 -20z m713 -28 c8 -22 -4 -67 -19 -67
                    -16 0 -17 5 -8 49 7 32 18 40 27 18z m-219 -3 c21 -8 21 -34 0 -34 -10 0 -14
                    6 -11 14 3 8 1 17 -6 20 -18 7 -1 7 17 0z m-109 -14 c3 -5 1 -10 -4 -10 -6 0
                    -11 5 -11 10 0 6 2 10 4 10 3 0 8 -4 11 -10z m-469 -38 c-9 -26 -46 -18 -46
                    10 0 17 3 18 15 8 12 -10 15 -9 15 6 0 13 3 15 11 7 6 -6 8 -20 5 -31z m849
                    18 c0 -7 -6 -15 -12 -17 -8 -3 -13 4 -13 17 0 13 5 20 13 18 6 -3 12 -11 12
                    -18z m-930 -10 c3 -11 2 -28 -4 -37 -8 -14 -10 -15 -11 -3 0 8 -3 25 -6 38 -8
                    27 12 30 21 2z m-901 -87 c4 -9 2 -31 -5 -50 -12 -37 -40 -43 -88 -19 -36 19
                    -95 6 -129 -27 -50 -51 -35 -195 24 -234 32 -20 107 -13 137 14 49 45 86 29
                    53 -22 -27 -40 -86 -72 -147 -79 -45 -5 -63 -2 -100 17 -62 31 -82 76 -83 187
                    -1 80 1 90 28 129 46 66 123 97 247 100 44 1 58 -3 63 -16z m1836 -23 c0 -29
                    -4 -40 -15 -40 -17 0 -20 32 -5 61 16 28 20 24 20 -21z m-65 -51 c-4 -21 -11
                    -39 -16 -39 -10 0 -12 93 -2 104 14 13 24 -26 18 -65z m152 24 c-3 -3 -11 -2
                    -17 2 -8 5 -7 11 2 22 12 15 13 14 16 -1 2 -10 1 -20 -1 -23z m-1637 -25 c11
                    -13 23 -33 27 -46 8 -33 -1 -103 -18 -135 -8 -14 -25 -47 -38 -72 -41 -82
                    -132 -119 -161 -66 -5 10 -11 50 -12 87 -2 59 2 77 26 126 57 114 129 157 176
                    106z m689 -9 c22 -39 8 -71 -41 -98 -67 -37 -88 -60 -88 -98 0 -41 20 -52 55
                    -29 32 21 45 20 45 -3 0 -19 -60 -80 -100 -101 -30 -16 -66 9 -74 53 -8 44 18
                    189 41 230 43 73 132 99 162 46z m231 -1 c11 -18 20 -41 20 -50 0 -9 -29 -38
                    -65 -65 -65 -48 -66 -48 -63 -93 3 -46 3 -46 51 -33 31 9 20 -34 -16 -61 -40
                    -30 -68 -33 -90 -8 -20 22 -22 43 -12 127 11 100 40 172 79 196 46 28 73 24
                    96 -13z m700 -33 c0 -14 -4 -25 -10 -25 -5 0 -10 11 -10 25 0 14 5 25 10 25 6
                    0 10 -11 10 -25z m-105 -247 c87 -45 118 -98 87 -152 -22 -38 -92 -76 -147
                    -77 -23 -1 -30 -4 -17 -6 27 -5 66 -61 88 -127 l17 -49 34 74 c40 87 58 109
                    90 109 38 0 29 -29 -54 -175 -7 -11 -23 -46 -37 -78 -36 -83 -132 -223 -196
                    -287 -30 -30 -79 -68 -109 -84 -47 -25 -66 -29 -140 -30 -134 -2 -184 31 -130
                    85 14 14 27 19 42 14 47 -14 104 -24 144 -25 33 0 55 9 113 48 70 47 86 67
                    146 177 39 73 39 153 0 219 l-29 48 -54 -6 c-40 -5 -53 -3 -53 7 0 15 57 72
                    80 80 27 8 -29 16 -207 27 -221 14 -268 8 -309 -36 -37 -41 -78 -120 -68 -135
                    4 -7 25 -9 59 -4 50 6 53 5 48 -14 -8 -32 -40 -53 -85 -57 -23 -2 -49 -10 -57
                    -18 -26 -27 -33 -176 -9 -176 7 0 22 10 35 21 19 19 23 20 29 6 8 -21 -10 -52
                    -49 -80 -48 -36 -65 -39 -87 -17 -25 25 -26 94 -5 195 8 38 15 71 15 72 0 2
                    -8 3 -17 3 -10 0 -24 4 -32 9 -13 8 -13 12 -1 26 7 9 26 22 41 28 26 11 129
                    152 129 176 0 37 -278 -14 -294 -55 -3 -7 8 -38 24 -69 l29 -55 -35 -26 c-45
                    -35 -44 -62 6 -112 22 -22 40 -49 40 -60 0 -65 -54 -114 -155 -139 -65 -16
                    -68 -16 -81 2 -20 27 -17 43 11 71 24 23 26 24 54 9 41 -20 57 -19 75 7 24 34
                    20 45 -29 92 -56 55 -58 82 -10 139 23 26 33 47 29 57 -57 132 -11 180 190
                    199 60 6 136 11 168 11 51 0 66 5 125 43 186 118 423 159 548 95z m-2095 -281
                    c103 -16 134 -32 192 -96 50 -56 58 -80 58 -186 0 -91 -34 -164 -98 -210 -22
                    -16 -40 -34 -39 -40 4 -18 380 -579 421 -628 80 -94 240 -249 295 -284 31 -20
                    68 -46 82 -57 14 -12 91 -52 171 -89 128 -59 202 -83 353 -117 50 -11 166 -12
                    225 0 25 4 72 13 104 19 77 14 196 71 229 111 33 38 42 84 31 158 -12 83 -12
                    84 26 97 57 20 76 6 84 -58 14 -108 -13 -176 -98 -250 -116 -100 -267 -142
                    -511 -142 -153 0 -164 2 -258 33 -114 37 -298 123 -339 158 -16 13 -48 32 -72
                    43 -80 35 -209 135 -338 261 -70 69 -128 132 -128 140 0 8 -14 35 -31 60 -16
                    25 -39 61 -49 81 -11 20 -44 70 -75 110 -30 41 -65 93 -76 117 -12 24 -32 55
                    -44 70 -12 15 -32 46 -44 69 -29 59 -57 75 -123 71 l-53 -3 -8 -180 c-8 -177
                    -8 -180 14 -197 11 -10 37 -18 56 -18 40 0 73 -15 73 -34 0 -23 -43 -27 -167
                    -16 -65 5 -142 9 -172 7 -34 -1 -55 2 -58 10 -7 19 47 47 101 53 l51 5 7 65
                    c3 36 10 166 13 290 4 124 9 273 12 332 3 58 3 122 -1 142 -6 32 -11 36 -36
                    36 -16 0 -39 -4 -52 -9 -13 -5 -61 -19 -108 -31 -161 -43 -329 -142 -410 -243
                    -94 -117 -130 -232 -106 -333 6 -23 4 -35 -9 -47 -26 -27 -63 -32 -85 -12 -34
                    31 -40 76 -20 153 23 89 44 129 118 228 151 204 465 352 787 372 11 1 58 -4
                    105 -11z m916 -92 c3 -8 -1 -43 -10 -77 -13 -55 -20 -121 -17 -167 1 -10 11
                    -5 31 14 17 16 30 23 30 16 0 -19 -26 -64 -50 -86 -12 -11 -28 -32 -36 -47 -8
                    -16 -22 -28 -31 -28 -14 0 -15 10 -10 70 3 39 2 70 -3 70 -5 0 -26 -25 -47
                    -55 -34 -49 -74 -77 -89 -62 -23 23 -25 156 -3 215 18 47 79 109 122 125 79
                    29 106 32 113 12z m734 -5 c4 0 13 -13 20 -29 16 -40 2 -62 -68 -109 -51 -33
                    -57 -41 -60 -76 -5 -53 8 -61 51 -36 38 23 55 14 38 -19 -17 -32 -93 -91 -117
                    -91 -12 0 -26 6 -32 13 -32 38 -21 184 20 266 17 34 34 52 68 69 25 12 51 20
                    58 17 8 -3 17 -5 22 -5z m178 -2 c7 -7 12 -29 12 -50 0 -21 4 -38 9 -38 4 0
                    22 23 39 50 31 50 56 62 80 38 18 -18 15 -63 -5 -81 -10 -8 -31 -17 -48 -19
                    -24 -2 -34 -11 -49 -43 -11 -22 -24 -49 -30 -60 -5 -11 -13 -46 -17 -78 -8
                    -65 -21 -87 -55 -87 -39 0 -44 73 -8 142 8 15 14 50 14 78 0 55 -16 66 -52 34
                    -16 -15 -18 -15 -24 -1 -4 11 11 36 42 72 48 55 70 65 92 43z m-1295 -12 c18
                    -7 46 -30 62 -51 24 -32 29 -48 28 -91 -2 -68 -35 -142 -80 -176 -31 -24 -44
                    -27 -88 -24 -74 5 -113 29 -138 84 -42 94 -14 227 55 257 42 18 119 19 161 1z
                    m-1096 -308 c-3 -8 -6 -5 -6 6 -1 11 2 17 5 13 3 -3 4 -12 1 -19z m1339 -163
                    c20 -31 32 -115 16 -115 -6 0 -21 13 -33 29 -25 34 -92 56 -137 47 -62 -14
                    -113 -109 -98 -187 8 -45 61 -109 89 -109 51 0 67 11 67 45 0 18 -9 44 -21 59
                    -12 15 -20 29 -18 30 2 2 38 5 79 7 62 3 75 1 78 -12 1 -9 -8 -20 -23 -27 -20
                    -9 -25 -19 -26 -49 -4 -116 -6 -117 -96 -115 -105 2 -152 20 -188 71 -28 40
                    -30 49 -30 129 0 69 4 95 21 126 38 74 84 93 226 95 72 1 79 -1 94 -24z m1139
                    -121 c-14 -36 -25 -69 -25 -72 0 -3 23 20 51 51 54 61 72 68 89 38 15 -29 12
                    -137 -5 -179 -20 -46 -76 -105 -132 -138 -35 -20 -43 -30 -43 -54 0 -44 25
                    -52 90 -30 52 17 98 56 126 105 7 14 17 17 37 11 40 -10 34 -37 -21 -89 -43
                    -39 -59 -47 -128 -62 -116 -25 -124 -32 -124 -108 0 -78 -22 -116 -82 -146
                    -53 -25 -71 -26 -88 -5 -10 11 -11 23 -4 42 8 21 16 27 39 27 26 0 33 7 52 45
                    12 25 23 56 25 70 5 41 -47 39 -142 -6 -83 -39 -99 -58 -80 -95 10 -18 9 -26
                    -8 -48 -39 -53 -82 -35 -82 35 0 36 6 51 36 83 30 34 52 45 146 77 61 20 118
                    44 128 54 11 11 23 54 34 129 10 61 21 125 26 141 10 36 -4 40 -37 9 -20 -20
                    -23 -20 -29 -5 -4 11 17 47 65 110 39 52 77 96 83 99 27 9 28 -24 3 -89z
                    m-946 40 c19 -14 22 -23 18 -50 -8 -48 12 -43 45 11 31 52 72 63 87 23 16 -44
                    -12 -84 -64 -90 -20 -2 -33 -11 -41 -28 -6 -14 -19 -41 -27 -60 -21 -44 -37
                    -146 -30 -184 5 -26 4 -28 -17 -21 -15 5 -20 4 -16 -4 4 -6 2 -11 -3 -11 -6 0
                    -11 9 -11 20 0 11 -5 20 -10 20 -6 0 -15 10 -21 23 -8 18 -6 37 11 86 25 74
                    34 141 22 159 -9 13 -42 6 -42 -9 0 -12 -27 -11 -35 1 -6 10 91 130 104 130 4
                    0 17 -7 30 -16z m340 6 c9 0 25 -16 35 -35 52 -95 -61 -325 -159 -325 -35 0
                    -52 30 -59 100 -6 60 -4 70 27 135 36 74 99 140 124 131 8 -3 22 -6 32 -6z
                    m236 0 c4 -6 -5 -50 -19 -100 -26 -90 -33 -150 -17 -150 37 0 108 125 126 223
                    7 35 10 38 39 35 30 -3 31 -4 29 -53 -1 -28 -13 -76 -27 -108 -15 -32 -26 -66
                    -26 -77 0 -24 22 -26 40 -5 17 21 30 19 30 -4 0 -22 -102 -131 -123 -131 -27
                    0 -39 27 -32 70 4 22 4 40 1 40 -3 0 -30 -25 -60 -56 -30 -31 -60 -54 -68 -52
                    -20 7 -22 110 -4 173 22 75 22 77 -20 69 -51 -9 -43 9 33 79 61 56 85 67 98
                    47z m-1535 -185 c0 -16 -6 -25 -15 -25 -15 0 -21 31 -8 43 13 14 23 6 23 -18z
                    m138 -57 c-3 -50 -20 -74 -31 -45 -7 19 13 97 25 97 5 0 8 -23 6 -52z m-58
                    -20 c-1 -23 -21 -58 -34 -58 -3 0 -6 18 -6 40 0 33 3 40 20 40 14 0 20 -7 20
                    -22z m-108 -20 c-9 -9 -12 -7 -12 12 0 19 3 21 12 12 9 -9 9 -15 0 -24z m1031
                    -95 c7 -37 -10 -54 -21 -22 -10 25 -6 49 8 49 4 0 10 -12 13 -27z m-869 -1 c8
                    -13 -16 -82 -26 -76 -10 6 -11 68 -1 77 9 9 21 9 27 -1z m-64 -22 c0 -11 -4
                    -20 -10 -20 -5 0 -10 9 -10 20 0 11 5 20 10 20 6 0 10 -9 10 -20z m260 -9 c0
                    -5 3 -18 7 -28 6 -17 6 -17 -10 -1 -19 18 -22 38 -7 38 6 0 10 -4 10 -9z
                    m-326 -41 c4 -17 -1 -33 -14 -50 l-20 -25 0 42 c0 73 21 93 34 33z m1102 14
                    c-3 -9 -6 -21 -6 -27 -1 -13 -30 22 -30 35 0 4 9 8 21 8 15 0 19 -4 15 -16z
                    m-266 -29 c0 -14 -4 -25 -10 -25 -11 0 -14 33 -3 43 11 11 13 8 13 -18z m-978
                    -28 c-8 -10 -8 -17 -1 -24 14 -14 3 -33 -17 -33 -11 0 -13 6 -9 20 4 12 2 20
                    -5 20 -6 0 -3 11 6 26 11 17 20 22 27 15 7 -7 6 -15 -1 -24z m2207 -13 c17
                    -14 31 -32 31 -39 0 -18 -67 -75 -89 -75 -10 0 -24 11 -31 25 -12 23 -11 31 8
                    70 12 25 28 45 36 45 8 0 28 -12 45 -26z m-1128 -17 c-13 -13 -26 -3 -16 12 3
                    6 11 8 17 5 6 -4 6 -10 -1 -17z m-1203 -9 c-6 -18 -28 -21 -28 -4 0 9 7 16 16
                    16 9 0 14 -5 12 -12z m188 -4 c-3 -9 -6 -20 -6 -25 0 -5 -4 -9 -10 -9 -11 0
                    -14 33 -3 43 12 13 25 7 19 -9z m262 4 c17 -17 15 -48 -3 -48 -8 0 -15 6 -15
                    14 0 8 -3 21 -6 30 -7 19 7 21 24 4z m742 -53 c0 -8 -30 -65 -34 -65 -2 0 -3
                    11 -3 25 0 14 4 25 9 25 5 0 6 5 3 10 -3 6 1 10 9 10 9 0 16 -2 16 -5z m-1200
                    -31 c0 -8 -7 -14 -15 -14 -15 0 -21 21 -9 33 10 9 24 -2 24 -19z m186 -1 c-10
                    -10 -19 5 -10 18 6 11 8 11 12 0 2 -7 1 -15 -2 -18z m1114 -7 c0 -37 -18 -59
                    -39 -47 -10 6 -9 10 3 14 10 4 16 18 16 37 0 16 5 30 10 30 6 0 10 -15 10 -34z
                    m-565 -6 c10 0 15 -11 15 -35 0 -19 -2 -35 -4 -35 -2 0 -11 -3 -20 -6 -13 -5
                    -15 -1 -9 26 5 26 3 32 -8 28 -8 -3 -13 -11 -11 -17 4 -18 -6 -13 -18 10 -9
                    16 -8 25 6 40 16 17 19 18 26 4 5 -8 16 -15 23 -15z m-855 -1 c0 -6 -7 -9 -15
                    -5 -9 3 -15 0 -15 -9 0 -19 -13 -25 -30 -14 -13 8 -12 12 4 24 23 18 56 20 56
                    4z m1465 1 c3 -5 -1 -10 -9 -10 -9 0 -16 5 -16 10 0 6 4 10 9 10 6 0 13 -4 16
                    -10z m-731 -35 c3 -17 -1 -41 -9 -55 -8 -15 -14 -19 -14 -10 -1 8 3 22 8 29 6
                    9 6 22 0 33 -6 10 -7 23 -3 29 8 14 12 9 18 -26z m-78 -55 c1 -38 -20 -35 -24
                    3 -2 17 1 27 10 27 8 0 13 -13 14 -30z m-66 -9 c0 -6 -4 -13 -10 -16 -5 -3
                    -10 1 -10 9 0 9 5 16 10 16 6 0 10 -4 10 -9z m-10 -63 c0 -19 -2 -20 -10 -8
                    -13 19 -13 30 0 30 6 0 10 -10 10 -22z m-580 -32 c0 -3 -4 -8 -10 -11 -5 -3
                    -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m96 -84 c-12 -11 -18 7 -10 30
                    l8 23 4 -23 c2 -13 1 -26 -2 -30z m1 -134 c-3 -8 -6 -5 -6 6 -1 11 2 17 5 13
                    3 -3 4 -12 1 -19z m117 16 c23 -9 20 -51 -4 -57 -12 -3 -20 -14 -20 -26 0 -12
                    -4 -21 -10 -21 -5 0 -10 9 -10 20 0 13 -7 20 -20 20 -11 0 -20 6 -20 14 0 9 7
                    12 21 9 16 -5 20 -1 19 13 -4 36 6 42 44 28z m-274 -47 c0 -16 -38 -53 -45
                    -45 -3 3 1 11 10 18 8 7 15 19 15 26 0 8 5 14 10 14 6 0 10 -6 10 -13z m27
                    -29 c-3 -8 -6 -5 -6 6 -1 11 2 17 5 13 3 -3 4 -12 1 -19z m183 -73 c0 -19 -5
                    -25 -21 -25 -11 0 -17 5 -14 10 3 6 1 10 -4 10 -6 0 -11 7 -11 15 0 9 9 15 25
                    15 20 0 25 -5 25 -25z m72 -32 c1 -21 1 -48 1 -60 -1 -12 5 -23 13 -25 8 -2 4
                    -8 -12 -15 -26 -12 -26 -12 -20 22 4 19 3 35 -1 35 -12 0 -35 58 -28 70 3 5
                    15 10 26 10 15 0 19 -8 21 -37z m1312 2 c-4 -8 1 -17 10 -21 22 -9 20 -24 -4
                    -24 -11 0 -20 6 -20 14 0 8 -5 16 -12 18 -15 5 -1 28 17 28 9 0 12 -6 9 -15z
                    m-1389 -66 c-5 -23 -3 -34 12 -44 17 -13 16 -14 -9 -15 -26 0 -28 3 -28 38 0
                    39 6 52 22 52 5 0 7 -14 3 -31z m299 -51 c-6 -19 -7 -19 -16 -4 -5 9 -6 26 -2
                    38 6 19 7 19 16 4 5 -9 6 -26 2 -38z m542 15 c-10 -10 -19 5 -10 18 6 11 8 11
                    12 0 2 -7 1 -15 -2 -18z m-470 -41 c-12 -11 -18 7 -10 30 l8 23 4 -23 c2 -13
                    1 -26 -2 -30z m376 26 c-7 -7 -12 -8 -12 -2 0 14 12 26 19 19 2 -3 -1 -11 -7
                    -17z m-667 -28 c8 -13 -21 -31 -39 -24 -25 10 -19 32 9 32 14 0 27 -4 30 -8z
                    m49 -12 c9 -37 7 -60 -6 -56 -13 5 -29 63 -20 73 11 10 20 4 26 -17z m1281 12
                    c3 -5 -1 -10 -9 -10 -9 0 -16 5 -16 10 0 6 4 10 9 10 6 0 13 -4 16 -10z m625
                    -5 c0 -2 -10 -9 -22 -15 -22 -11 -22 -10 -4 4 21 17 26 19 26 11z m-1680 -24
                    c0 -6 -4 -13 -10 -16 -5 -3 -10 1 -10 9 0 9 5 16 10 16 6 0 10 -4 10 -9z m-95
                    -39 c-8 -8 -25 10 -19 20 4 6 9 5 15 -3 4 -7 6 -15 4 -17z m485 13 c0 -9 -9
                    -15 -22 -15 -22 1 -23 1 -4 15 25 19 26 19 26 0z m527 -51 c-3 -48 -17 -43
                    -17 7 0 24 4 38 10 34 5 -3 9 -22 7 -41z m-557 22 c0 -3 -4 -8 -10 -11 -5 -3
                    -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m35 -21 c0 -10 -6 -20 -12 -22
                    -8 -3 -13 5 -13 22 0 17 5 25 13 23 6 -3 12 -13 12 -23z m955 -75 c-20 -13
                    -33 -13 -25 0 3 6 14 10 23 10 15 0 15 -2 2 -10z m-69 -26 c-19 -8 -39 -13
                    -45 -10 -14 5 32 25 59 25 13 0 9 -5 -14 -15z m-94 -30 c-3 -3 -12 -4 -19 -1
                    -8 3 -5 6 6 6 11 1 17 -2 13 -5z m-52 -14 c-11 -5 -27 -9 -35 -9 -13 -1 -13 0
                    0 9 8 5 24 9 35 9 l20 0 -20 -9z m-542 -57 c-7 -2 -19 -2 -25 0 -7 3 -2 5 12
                    5 14 0 19 -2 13 -5z"/>
                    <path d="M1921 3097 c-20 -25 -41 -86 -41 -122 0 -35 0 -35 45 -35 34 0 47 5
                    55 19 14 27 13 124 -2 139 -16 16 -43 15 -57 -1z"/>
                    <path d="M1552 2826 c-34 -39 -50 -103 -32 -135 10 -20 12 -20 41 -5 42 21 75
                    95 62 138 -12 42 -35 43 -71 2z"/>
                    <path d="M2252 2866 c-6 -13 -8 -27 -5 -30 11 -11 43 15 43 34 0 28 -25 25
                    -38 -4z"/>
                    <path d="M2501 2864 c-24 -31 -27 -44 -8 -44 16 0 47 32 47 48 0 23 -19 21
                    -39 -4z"/>
                    <path d="M2920 2600 c-70 -6 -98 -13 -155 -43 -127 -65 -128 -64 36 -71 79 -4
                    169 -11 199 -16 86 -15 180 16 180 60 0 28 -45 58 -98 65 -26 4 -54 8 -62 9
                    -8 2 -53 0 -100 -4z"/>
                    <path d="M990 2294 c-13 -4 -15 -36 -15 -212 l0 -207 60 -3 c32 -2 69 -1 82 3
                    36 9 92 74 107 126 19 63 7 157 -27 208 -40 60 -142 102 -207 85z"/>
                    <path d="M1860 2178 c-49 -52 -65 -129 -29 -136 20 -4 69 85 69 127 0 37 -11
                    39 -40 9z"/>
                    <path d="M2650 2185 c-7 -14 -10 -28 -6 -32 11 -11 41 12 41 32 0 28 -20 28
                    -35 0z"/>
                    <path d="M1474 2185 c-19 -29 -29 -102 -20 -138 8 -33 73 -97 98 -97 11 0 33
                    13 49 29 25 25 29 37 29 84 0 63 -21 107 -61 131 -40 24 -76 20 -95 -9z"/>
                    <path d="M3013 1563 c-35 -13 -82 -153 -51 -153 34 1 88 68 88 111 0 29 -18
                    49 -37 42z"/>
                    <path d="M2306 1586 c-42 -44 -59 -118 -33 -143 14 -15 18 -14 42 1 55 36 78
                    135 39 167 -11 9 -21 4 -48 -25z"/>
                    </g>
                    </svg>
                  </Typography>
                  <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{navList}</div>
                    <div className="flex items-center gap-x-1 mr-2">
                    
                    
                    
                    
                    <IconButton color='blue-gray' variant='outlined' className=' h-8 w-8 rounded-full mr-3'>
                      <UserIcon className="h-4 w-4" />
                    </IconButton>
                  
                    
                    <Badge content="1" color='blue-gray' withBorder>
                    <IconButton color='blue-gray' className='h-8 w-8 rounded-full'>
                      <ShoppingCartIcon className="h-4 w-4" />
                    </IconButton>
                  </Badge>
                    </div>
                    <IconButton
                      variant="text"
                      className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                      ripple={false}
                      onClick={() => setOpenNav(!openNav)}
                    >
                      {openNav ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      )}
                    </IconButton>
                  </div>
                </div>
                <Collapse open={openNav}>
                  {navList}
                  {topNavList}
                </Collapse>
              </Navbar>
            </div>
    );
};

export default Header;