import * as React from 'react'

import { Search } from './OpenWeatherAPI'
import { WeatherLabSearch } from './WeatherLabSearch'
import { WeatherLabResultList } from './WeatherLabResultList'

/**
 * Interface describing component properties.
 *
 * @private
 */
interface IProperties extends React.Props<WeatherLabPanel> {
  /**
   * Display title.
   */
  title: string

  /**
   * Execute on change when searchResults change.
   */
  onChange: Function
}

/**
 * Interface describing component state.
 *
 * @private
 */
interface IState {
  searchResults: Array<any>
  isSearching: boolean
  searchSuccess: boolean
  searchFailure: boolean
  searchErrorMessage: string
}

class WeatherLabPanel extends React.Component<IProperties, IState> {
  /**
   * Returns a component for rendering search box.
   *
   * @param props - panel properties
   * @returns searchbox component
   */
  constructor(props: IProperties) {
    super(props)
    this.state = {
      searchResults: null,
      isSearching: false,
      searchSuccess: false,
      searchFailure: false,
      searchErrorMessage: ''
    }
  }

  render = () => {
    let result

    if (this.state.isSearching) {
      result = (
        <div className="jp-WeatherLab-loader">
          <div className="jp-SpinnerContent"></div>
        </div>
      )
    } else if (this.state.searchFailure) {
      result = (
        <div className="jp-WeatherLab-error-wrappaer">
          <div className="jp-WeatherLab-error">sample errror</div>
        </div>
      )
    } else if (this.state.searchSuccess && this.state.searchResults !== null) {
      result = <WeatherLabResultList items={this.state.searchResults} />
    }

    return (
      <div className="jp-WeatherLab">
        <header className="jp-WeatherLab-header">{this.props.title}</header>
        <div className="jp-WeatherLab-content">
          <WeatherLabSearch onSearch={this.handleSearch} />
          {result}
        </div>
      </div>
    )
  }

  /**
   * Sets state params to 'search in progress' conditions.
   */
  searchStart = () => {
    this.setState({
      isSearching: true,
      searchSuccess: false,
      searchFailure: false
    })
  }

  /**
   * Sets state params to 'search success' conditions.
   */
  searchSuccess = () => {
    this.setState({
      isSearching: false,
      searchSuccess: true,
      searchFailure: false,
      searchErrorMessage: ''
    })
  }

  /**
   * Sets state params to 'search failure' conditions.
   */
  searchFailure = (message?: string) => {
    this.setState({
      isSearching: false,
      searchSuccess: false,
      searchFailure: true,
      searchErrorMessage: message
    })
  }

  /**
   * Handle search action
   *
   * @param query - search term
   */
  handleSearch = async (query: string) => {
    this.searchStart()

    try {
      const data = await Search<{
        cod: string
        message: string
        list: Array<any>
      }>(query)

      if (data.cod === '200') {
        this.setState({
          searchResults: data.list
        })
        this.searchSuccess()
      } else {
        this.searchFailure(data.message)
      }
      this.props.onChange(data)
    } catch (Error) {
      this.searchFailure(Error.message)
      this.props.onChange({ cod: 'exception', message: Error.message })
    }
  }
}

/**
 * Exports.
 */
export { WeatherLabPanel }
