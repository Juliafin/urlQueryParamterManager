export const createQueryString = (queryFields) => {
  if (!queryFields || !queryFields.length) {
    return ''
  }
  console.log(queryFields, 'Query fields!');


  const queryFieldsObj = queryFields.reduce((accum, {key, value}) => {
    if (accum[key]) {
      accum[key] = `${accum[key]},${value}`;
    } else {
      accum[key] = value;
    }
    return accum;
  }, {})

  console.log('Query fields obj', queryFieldsObj);

  const queryString = Object
    .entries(queryFieldsObj)
    .map(([key, value], index, arr) => {
      const separator = index === arr.length - 1 ? '' : '&';
      return `${key}=${encodeURI(value)}${separator}`;
    })
    .join("")

    return `?${queryString}`

}