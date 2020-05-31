import fileSaver from 'file-saver';


export const saveFile = (fileText, fileName) => {
  const blob = new Blob([JSON.stringify(fileText, null , 2)],  {
    type: "application/json;charset=utf8"
  });
  fileSaver.saveAs(blob, fileName)
}