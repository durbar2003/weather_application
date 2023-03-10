import * as React from 'react'
import { WeatherLabResultItem } from './WeatherLabResultItem'

/**
 * Interface describing component properties.
 *
 * @private
 */
interface IProperties extends React.Props<WeatherLabResultList> {
  /**
   * Display title.
   */
  items: Array<any> | null
}

/**
 * Interface describing component state.
 *
 * @private
 */
interface IState {}

class WeatherLabResultList extends React.Component<IProperties, IState> {
  render() {
    let items

    if (this.props.items !== null) {
      items = this.props.items.map(item => (
        <WeatherLabResultItem key={item.id} data={item} />
      ))
    }
    return <div className="jp-WeatherLab-results">{items}</div>
  }
}

/**
 * Exports.
 */
export { WeatherLabResultList }
