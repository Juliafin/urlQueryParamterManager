export const createQueryString = (queryFields) => {
  if (!queryFields || !queryFields.length) {
    return ''
  }

  const queryFieldsObj = queryFields.reduce((accum, {key, value}) => {
    if (accum[key]) {
      accum[key] = `${accum[key]},${value}`;
    } else {
      accum[key] = value;
    }
    return accum;
  }, {})

  const queryString = Object
    .entries(queryFieldsObj)
    .map(([key, value], index, arr) => {
      const separator = index === arr.length - 1 ? '' : '&';
      return `${key}=${encodeURI(value)}${separator}`;
    })
    .join("")

    return `?${queryString}`

}