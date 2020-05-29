import React from "react";
import { Container, IconButton, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { ManagerContext } from "../../store/URLManagerContext";
import ConfirmationDialog from '../ConfirmationDialog';
import { saveFile } from '../../utils/exportUtil';
import "./ConfigurationManagementLayout.css";

const ConfigurationManagementLayout = () => {
  const { configurations, handlers } = React.useContext(ManagerContext);

  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [selectedConfiguration, setSelectedConfiguration] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogCloseOnCancel = (event) => {
    setDialogOpen(false);
  }

  const handleDialogCloseOnConfirm = (event) => {
    setDialogOpen(false);
    handlers.deleteAllConfigurations();
  }

  const handleDialogOpen = (event) => {
    setDialogOpen(true)
  }

  const handleConfigurationItemClick = (event, index, configuration) => {
    setSelectedConfiguration(configuration);
    setSelectedIndex(index);
  };


  const handleExport = () => {
    console.log('Exporting configurations');
    console.log(configurations);
    saveFile(configurations, 'configurations.json');
  }

  const configurationList = !Object.keys(configurations).length ? (
    <Container>
      <p>
        No configurations added yet. Please add one under the{" "}
        <span>Parameters</span> section
      </p>
    </Container>
  ) : (
    Object.keys(configurations).sort().map((configuration, index) => {
      return (
        <ListItem
          key={index}
          button
          selected={selectedIndex === index}
          onClick={(event) =>
            handleConfigurationItemClick(event, index, configuration)
          }
          className="configurationListItem"
          dense
          id={index}
          key={index}
        >
          <ListItemText primary={configuration} />
          <IconButton
            onClick={(event) => {
                console.log("Selected configuration", configuration);
                handlers.deleteConfigurationItemHandler(configuration);
              }}
            edge="end"
            aria-label="delete">
            <DeleteIcon
            />
          </IconButton>
        </ListItem>
      );
    })
  );

  const currentConfiguration = configurations[selectedConfiguration];
  const configurationData = currentConfiguration
    ? currentConfiguration.map(({ key, value }, index) => {
        return (
          <TableRow className="configurationTableRow" key={index}>
            <TableCell align="right">{key}</TableCell>
            <TableCell align="right">{value}</TableCell>
          </TableRow>
        );
      })
    : null;

  return (
    <Container className="configurationManagementContainer">
      <Typography className="configurationWarning" variant="h6">Be careful! Deleting configuration values is permanent!</Typography>
      <ConfirmationDialog
        open={dialogOpen}
        handleCloseOnCancel={handleDialogCloseOnCancel}
        handleCloseOnConfirm={handleDialogCloseOnConfirm}
        itemNames="Configurations"
      />
      <Container className="configurationListContainer">
        <List>{configurationList}</List>
      </Container>
      <Divider />
      <TableContainer
        className="configurationDisplayContainer"
        component={Paper}
      >
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Parameter Key</TableCell>
              <TableCell align="right">Parameter Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{configurationData}</TableBody>
        </Table>
      </TableContainer>

      <Container className="buttonContainer">
      <Button
          variant="outlined"
          color="primary"
          onClick={handleExport}
        >Export Configurations</Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleDialogOpen}
        >Delete all Configurations</Button>
      </Container>
    </Container>
  );
};

export default ConfigurationManagementLayout;
