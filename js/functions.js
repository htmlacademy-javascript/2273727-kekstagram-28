// Функция для проверки длины строки

const validateLength = (string, maxLength) => string.length <= maxLength;

validateLength('проверяемая строка', 18);

// Функция для проверки, является ли строка палиндромом

const checkIfPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < string.length; i++) {
    if (
      string[i] !== string.at(- 1 - i)
    ) {
      return false;
    }
  }
  return true;
};

checkIfPalindrome('Лёша на полке клопа нашёл ');

/*
Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
(Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число)
*/

const extractNumber = (string) => {
  string = string.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseFloat(string[i]))) {
      result += string[i];
    }
  }
  return parseFloat(result);
};

extractNumber('ECMAScript 2022');

/*
Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку,
дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться.
Если «добивка» слишком длинная, она обрезается с конца.
*/


const expandString = (string, minLength, symbols) => {
  const fillerLength = minLength - string.length;
  const filler = symbols.slice(0, fillerLength);
  const numberOfFillerUses = Math.floor((minLength - string.length) / symbols.length);
  const leftoverLength = (minLength - string.length) % symbols.length;
  const leftover = symbols.slice(0, leftoverLength);
  let fillerText = '';
  for (let i = 0; i < numberOfFillerUses; i++) {
    fillerText += filler;
  }
  return leftover + fillerText + string;
};

expandString('q', 4, 'we');
