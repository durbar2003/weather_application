import {
  ILabShell,
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application'

import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook'
import { WeatherLab } from './WeatherLab'
import '../style/index.css'

/**
 * Activates the WeatherLab extension.
 *
 * @private
 * @param app - Jupyter application
 * @param labShell - Jupyter lab shell
 * @param restorer - application layout restorer
 * @param notebookTracker - notebook tracker
 * @returns WeatherLab
 */
function activateWeatherLab(
  app: JupyterFrontEnd,
  labShell: ILabShell,
  restorer: ILayoutRestorer,
  notebookTracker: INotebookTracker
): any {
  let weatherlab = new WeatherLab({})
  weatherlab.title.iconClass = 'jp-WeatherLab-icon jp-SideBar-tabIcon'
  weatherlab.title.caption = 'Weather Lab'
  weatherlab.id = 'weatherlab'
  labShell.add(weatherlab, 'left', { rank: 700 })
  labShell.currentChanged.connect(onConnect)

  restorer.add(weatherlab, 'weatherlab')

  notebookTracker.widgetAdded.connect((sender: any, nbPanel: NotebookPanel) => {
    nbPanel.sessionContext.ready
      .then(() => {
        nbPanel.sessionContext.session.kernel.requestExecute({
          code: '%load_ext weatherlab'
        })

        return createComm(nbPanel)
      })
      .then((comm: any) => {
        console.log(comm)
        weatherlab.handleChangeSignal.connect(
          (sender: WeatherLab, data: any) => {
            comm.send({ WEATHER_LAB_DATA: data })
          }
        )
      })
  })

  /**
   * Callback invoked when the active widget changes.
   *
   * @private
   */
  function onConnect() {
    let widget = app.shell.currentWidget
    if (!widget) {
      return
    }
  }

  /**
   * Create a Comm to the current notebook.
   *
   * @private
   */
  function createComm(nbPanel: NotebookPanel): Promise<any> {
    const comm = nbPanel.sessionContext.session.kernel.createComm('weatherlab')

    comm.onMsg = (msg: any) => {
      console.log(`WeatherLab has received a message: ${JSON.stringify(msg)}`)
    }

    comm.open({ msgtype: 'WeatherLab-Frontend' })

    return Promise.resolve(comm)
  }
}
/**
 * Initialization data for the weatherlab extension.
 *
 * @private
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-weatherlab',
  autoStart: true,
  requires: [ILabShell, ILayoutRestorer, INotebookTracker],
  activate: activateWeatherLab
}

export default extension
