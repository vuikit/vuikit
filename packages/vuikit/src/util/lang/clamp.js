export default function (number, min = 0, max = 1) {
  return Math.min(Math.max(number, min), max)
}
