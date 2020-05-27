export const readFile = (file) => {

  let reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = function(e) {
      // that.displayData(e.target.result);
      const data = e.target.result;
      console.log(data, 'DATA!!');
      resolve(data);
    };
    reader.readAsText(file);
  })
}