export function isValidISBN(isbn) {
  let regex = /^(978|979)-\d{1,5}-\d{1,7}-\d{1,6}-\d$/;
  if (!regex.test(isbn)) {
    return false;
  }

  // Remove non-digit characters
  isbn = isbn.replace(/\D/g, "");

  // Calculate the checksum
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(isbn.charAt(i)) * (i % 2 === 0 ? 1 : 3);
  }

  let checksum = (10 - (sum % 10)) % 10;

  // Compare the calculated checksum with the last digit of the ISBN
  return checksum === parseInt(isbn.charAt(12));
}
