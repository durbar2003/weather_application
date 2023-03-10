import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Message } from '@lumino/messaging'
import { Widget } from '@lumino/widgets'
import { ISignal, Signal } from '@lumino/signaling'
import { WeatherLabPanel } from './WeatherLabPanel'

export class WeatherLab extends Widget {
  /**
   * Returns a new table of contents.
   *
   * @param options - options
   * @returns widget
   */
  constructor(options: WeatherLab.IOptions) {
    super()
  }

  /**
   * Callback invoked upon an update request.
   *
   * @param msg - message
   */
  protected async onUpdateRequest(msg: Message): Promise<void> {
    let title = 'Weather Lab'
    ReactDOM.render(
      <WeatherLabPanel title={title} onChange={this.handleChange} />,
      this.node
    )
  }

  /**
   * Callback invoked to re-render after showing a table of contents.
   *
   * @param msg - message
   */
  protected onAfterShow(msg: Message): void {
    this.update()
  }

  /**
   * Handle data cahnges in WeatherLabPanel.
   *
   * @param data - data from WeatherLabPanel
   */
  handleChange = (data: any) => {
    this._handleChangeSignal.emit(data)
  }

  /**
   * getter for the private attribute `_handleChangeSignal`
   */
  get handleChangeSignal(): ISignal<WeatherLab, any> {
    return this._handleChangeSignal
  }

  private _handleChangeSignal = new Signal<WeatherLab, any>(this)
}

export namespace WeatherLab {
  /**
   * Interface describing WeatherLab widget options.
   */
  export interface IOptions {}
}
