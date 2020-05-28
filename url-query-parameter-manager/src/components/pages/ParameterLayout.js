import React from "react";
import { Container, Button } from "@material-ui/core";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { ConfigurationInput } from "../ConfigurationInput";
import { ParamsDisplay } from "../ParamsDisplay";
import { ManagerContext } from "../../store/URLManagerContext";
import "./ParameterLayout.css";


const ParameterLayout = () => {
  const {
    currentConfiguration,
    configurations,
    handlers,
    keyHistory,
    newUrl,
    queryFields,
    tabId,
    url,
  } = React.useContext(ManagerContext);


  const isConfigurationButtonDisabled = !Boolean(currentConfiguration);
  return (
    <div className="configurationLayout">
      <h1>Url Query Parameter Manager</h1>
      <Container className="urlContainer">
        <p><span>Current url:</span> {encodeURI(url)}</p>
        <p><span>New url:</span> {encodeURI(newUrl)}</p>
      </Container>
      <ConfigurationInput
        configurationChangeHandler={handlers.onConfigurationChangeHandler}
        configurationOptions={Object.keys(configurations)}
      />
      <ParamsDisplay
        queryFieldOnChangeHandler={handlers.queryFieldOnChangeHandler}
        queryFields={queryFields}
        queryFieldOnDeleteHandler={handlers.queryFieldOnDeleteHandler}
        keyHistory={keyHistory}
      />
      <Container
        className="flex addContainer"
        onClick={handlers.queryFieldOnAddHandler}
      >
        <AddCircleOutlineRoundedIcon className="icon addCircle" />
      </Container>

      <Container className="configurationButtonContainer">
        <Button
          className="configurationButton"
          onClick={handlers.setUrlHandler}
          variant="outlined"
        >
          Set Url
        </Button>
        <Button
          className="configurationButton"
          onClick={handlers.saveConfigurationHandler}
          disabled={isConfigurationButtonDisabled}
          variant="outlined"
        >
          Save Configuration
        </Button>
      </Container>
    </div>
  );
};

export default ParameterLayout;
