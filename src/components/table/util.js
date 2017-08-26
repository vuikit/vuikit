export function joinClasses (...classes) {
  const isNotEmpty = c => c
  return classes.filter(isNotEmpty).join(' ')
}
