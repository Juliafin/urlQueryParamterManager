export const readFile = (file) => {

  let reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = function(e) {
      const data = e.target.result;
      resolve(data);
    };
    reader.readAsText(file);
  })
}