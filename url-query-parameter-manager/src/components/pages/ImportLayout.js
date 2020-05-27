import React from 'react';
import { readFile } from '../../utils/readFile';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const ImportLayout = () => {

  return (
    <Container>
      <Typography variant="h6">Import a JSON file below</Typography>
      <input accept=".json" type="file" onChange={async (event) => {
        console.log('File loaded', event);
        const file = event.target.files && event.target.files[0];
        const parsedFile = await readFile(file);

        try {
          const json = JSON.parse(parsedFile)
          console.log('JSON!', json);
        } catch(err) {
          console.log('err parsing: ', err)
        }

      }}/>
    </Container>




  )
}


export default ImportLayout;