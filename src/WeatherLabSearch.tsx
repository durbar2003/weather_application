import * as React from 'react'

/**
 * Interface describing component properties.
 *
 * @private
 */
interface IProperties extends React.Props<WeatherLabSearch> {
  onSearch: Function
}

/**
 * Interface describing component state.
 *
 * @private
 */
interface IState {
  query: string
}

/**
 * Class inplementing search box component.
 */
class WeatherLabSearch extends React.Component<IProperties, IState> {
  /**
   * Returns a component for rendering search box.
   *
   * @param props - search bar properties
   * @returns searchbox component
   */
  constructor(props: IProperties) {
    super(props)
    this.state = { query: '' }
  }

  render = () => {
    return (
      <form className="jp-WeatherLab-search" onSubmit={this.handleSubmit}>
        <input
          type="search"
          placeholder="SEARCH"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button type="submit" />
      </form>
    )
  }

  /**
   * Sets `query` in state on change
   *
   * @param event - HTML input event
   */
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value })
  }

  /**
   * Executes `onSearch` on submit form
   */
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.props.onSearch(this.state.query)
  }
}

/**
 * Exports.
 */
export { WeatherLabSearch }
