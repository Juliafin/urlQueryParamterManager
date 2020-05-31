export const createQueryString = (queryFields) => {
  if (!queryFields || !queryFields.length) {
    return ''
  }
  return `?${queryFields.map((field, index) => {
    let separator = index === queryFields.length - 1 ? '' :'&'; 
    return `${field.key}=${encodeURI(field.value)}${separator}`
  }).join("")}`;
}