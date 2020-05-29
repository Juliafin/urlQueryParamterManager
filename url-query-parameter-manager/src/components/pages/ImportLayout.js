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

  const failureMessage = importFileSuccess === false ? (
    <Container>
      <p className="failureMessage">There was an error importing. Please check the file format and try again.</p>
    </Container>
  ) : null;



  const importFileHandler = async (event, handler) => {
    const file = event.target.files && event.target.files[0];
    const parsedFile = await readFile(file);

    try {
      const parsedJson = JSON.parse(parsedFile);
      handler(parsedJson);
      setImportFileSuccess(true);

    } catch (err) {
      console.log("err parsing: ", err);
      setImportFileSuccess(false);
    }
  };

  return (
    <Container className="importContainer">
      <Typography variant="h6">Import a JSON file below</Typography>

      <Container className="importInputContainer">
        <p>Key and Value import: </p>
        <input className="fileInput" accept=".json" type="file" onChange={(event) => {
          importFileHandler(event, handlers.importKeyHistoryHandler)
        }} />
      </Container>

        <Container className="importInputContainer">
          
        <p>Parameter Group Configuration import: </p>
        <input className="fileInput" accept=".json" type="file" onChange={(event) => {
          importFileHandler(event, handlers.addConfigurationsHandler)
        }} />

      </Container>
      <Container className="messageContainer">
        {successMessage}
        {failureMessage}
      </Container>

      <p>Import guide (Read this before importing!): </p>
      <ul>
        <li>Files must end in a .json extension</li>
        <li>Exactly one file may be imported at a time</li>
        <li>Values should always be strings</li>
        <li>Use the correct import button for the JSON format you are importing</li>
        <li>The json must be properly formatted in one of the following forms: </li>
        <h6>Key and value configuration: </h6>
        <p>This JSON will add suggested key and value pairs. It may contain any number of keys.</p>
        <pre>{`
    {
      "key1": ["value1", "value2"...],
      "key2": ["value3", "value4", "value5"]
    }
            `}
        </pre>
        
        <h6>Parameter Group Configurations</h6>
        <p>This JSON will add a new configuration(s) containing sets of key and value pairs. The JSON may contain any number of configurations in this format.</p>
        <pre>{`"NameOfConfiguration": [
    {
      "id": 1,
      "key": "v",
      "value": "Anotherthing"
    },
    {
      "id": 2,
      "key": "hereissomethingcool",
      "value": "key"
    }
  ]`}</pre>
      </ul>


    </Container>
  );
};

export default ImportLayout;
