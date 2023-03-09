import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the weather_application extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'weather_application:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension weather_application is activated!');
  }
};

export default plugin;
