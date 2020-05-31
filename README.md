# URL Query Parameter Manager


## Purpose and function

This application is meant to be a useful tool in assistance of web development. It can be used to:

1. Read and organize query parameters from the current web page
2. Store groups of key and value pairs as configurations
3. Manage suggested key and value pairs
4. Manage stored configurations
5. Import and export stored key and value pairs and configurations



##  Parameter Screen

![Parameter Screen](/images/ParameterScreen.PNG)

You can view the current and altered urls on this screen. Edit the url query parameters by editing the `key` and `value` fields, deleting them using the `-` Buttons, and adding new fields by using the `+` button. 

Key and values names are auto suggested based on stored keys and values as well as saved configurations. To see the full list of suggested keys and values, delete the value in the field and click on it.

Save configurations By entering a configuration name in the `configuration name` field and then clicking the `Save Configuration` button.

If you have configurations saved, clicking on the field will toggle an autocomplete menu that will allow you to switch between configurations.

Click the `Set Url` button and it will set the url displayed as `New url` in your browser address bar. If you have made changes to the url you do not wish to save, you can click the the `Revert Url` button to revert the set browser address url. Note: setting the url does not navigate you to the page, you must still click on the address bar and press enter to navigate to the set url.

##  Stored Keys & Values Screen

![Stored Keys & Values Screen](/images/KeysAndValuesScreen.PNG)


This screen can be used to view, add, and remove suggested key and value pairs visible on the Parameters screen when entering new values or editing existing ones.

Keys and values entered when saving a configuration or importing one will appear here. To enter a new key or value, enter into the appropriate field and click the + icon. Keys and values entered must be unique. Click the `trash can` icon next a key or value to delete it.

Clicking on a specific key will display the stored values for that key below.

Click the `Export Keys and Values` button to export the stored keys and values to a JSON file formatted in the following structure:

Click the `Delete all Keys and Values` button to permanently and irreversibly delete stored keys and values


```json 
{
      "key1": [
        "value1", "value2"...
      ],
      "key2": [
        "value3", "value4", "value5"
      ]
}
```


##  Import Screen

![Stored Keys & Values Screen](/images/ImportScreen.PNG)

This screen will allow you to import JSON files for both suggested keys and values as well as configurations. In order to do so please follow the import guide outlined on this page.


##  Manage Configuration Screen

![Manage Screen](/images/ConfigurationScreen.PNG)


This screen will allow you to view and remove existing stored configurations. 

To remove a configuration, click the `trash can` icon next to the relevant configuration. 

To export all stored configurations, click the `Export Configurations` button.

To delete all stored configurations, click the `Delete All Configurations` button and follow the prompts. Please be aware that this is permanent and irreversible!



### Technologies used:

- Storage api
- Windows and Tabs apis
- React
- React Router
- Filesaver.js

