export const createQueryString = (queryFields) => {
  return `?${queryFields.map((field, index) => {
    let separator = index === queryFields.length - 1 ? '' :'&'; 
    return `${field.key}=${encodeURI(field.value)}${separator}`
  }).join("")}`;
}