import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';

/**
 * Initialization data for the weather_application extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_weather_application',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, pallete: ICommandPalette) => {
    console.log('JupyterLab extension weather_application is activated!');
    console.log('ICommandPalette:', palette);
  }
};

export default plugin;
