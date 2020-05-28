import React from "react";
import { readFile } from "../../utils/readFile";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ManagerContext } from '../../store/URLManagerContext';
import './ImportLayout.css';

const ImportLayout = () => {

  const { handlers } = React.useContext(ManagerContext);
  const [ importFileSuccess, setImportFileSuccess ] = React.useState(null);

  const successMessage = importFileSuccess === true ? (
    <Container className="importMessageContainer">
      <p className="successMessage">File imported successfully!</p>
    </Container>
  ) : null;

  const failureMessage = importFileSuccess === true ? (
    <Container>
      <p className="failureMessage">There was an error importing. Please check the file format and try again.</p>
    </Container>
  ) : null;



  const importFileHandler = async (event) => {
    const file = event.target.files && event.target.files[0];
    const parsedFile = await readFile(file);

    try {
      const json = JSON.parse(parsedFile);
      handlers.importKeyHistoryHandler(json);
      setImportFileSuccess(true);

    } catch (err) {
      console.log("err parsing: ", err);
      setImportFileSuccess(false);
    }
  };

  return (
    <Container>
      <Typography variant="h6">Import a JSON file below</Typography>

      <p>Import guide: </p>
      <ul>
        <li>Files must end in a .json extension</li>
        <li>The json must be properly formatted in the following form: </li>
        <pre>{`
              {
                "key1": ["value1", "value2"...],
                "key2": ["value3", "value4", "value5"]
              }
            `}</pre>
        <li>Values should always be strings</li>
      </ul>
      <Container className="importInputContainer">
        <input className="fileInput" accept=".json" type="file" onChange={importFileHandler} />
      </Container>

      {successMessage}
    </Container>
  );
};

export default ImportLayout;
