import React from "react";
import { readFile } from "../../utils/readFile";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ManagerContext } from '../../store/URLManagerContext';

const ImportLayout = () => {

  const { handlers } = React.useContext(ManagerContext);

  const importFileHandler = async (event) => {
    console.log("File loaded", event);
    const file = event.target.files && event.target.files[0];
    const parsedFile = await readFile(file);

    try {
      const json = JSON.parse(parsedFile);
      handlers.importKeyHistoryHandler(json);
      console.log("JSON!", json);
    } catch (err) {
      console.log("err parsing: ", err);
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

      <input accept=".json" type="file" onChange={importFileHandler} />
    </Container>
  );
};

export default ImportLayout;
