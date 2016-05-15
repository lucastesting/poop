// Flickr short urls
//  https://flic.kr/p/{base58-photo-id}
function base58(n) {
  let idNumber = n
  const alphabet = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "a",
    "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
    "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
    "w", "x", "y", "z", "A", "B", "C", "D", "E", "F",
    "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z",
  ]

  if (idNumber === 0) { return alphabet[0] }

  let result = ""
  const base = alphabet.length

  while (idNumber > 0) {
    const remainder = idNumber % base
    console.log("remainder", remainder)
    idNumber = parseInt(idNumber / base, 10)
    result = alphabet[remainder] + result
  }
  return result
}

export default function shortFlickrUrl(id) {
  return `https://flic.kr/p/${base58(id)}`
}
