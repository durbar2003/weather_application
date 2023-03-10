import * as React from 'react'

/**
 * Interface describing component properties.
 *
 * @private
 */
interface IProperties extends React.Props<WeatherLabResultItem> {
  /**
   * Display title.
   */
  data: any
}

/**
 * Interface describing component state.
 *
 * @private
 */
interface IState {}

class WeatherLabResultItem extends React.Component<IProperties, IState> {
  render() {
    const { data } = this.props
    let temp = this.kelvinToCelsius(data.main.temp)
    let tempMin = this.kelvinToCelsius(data.main.temp_min)
    let tempMax = this.kelvinToCelsius(data.main.temp_max)

    return (
      <div className="jp-WeatherLab-item">
        <div className="jp-WeatherLab-item-title">
          <img
            src={`http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`}
            alt={data.sys.country}
          />
          <strong>
            {data.name}, {data.sys.country}
          </strong>{' '}
          ({data.coord.lat}, {data.coord.lon})
        </div>
        <div className="jp-WeatherLab-item-summary">
          <div className="jp-WeatherLab-item-summary-icon">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].main}
            />
          </div>
          <div className="jp-WeatherLab-item-summary-text">
            <div className="jp-WeatherLab-weather">
              {data.weather[0].description}
            </div>
            <div>
              Temperature {temp} °C ({tempMin} °C - {tempMax} °C)
            </div>
            <div>Wind {data.wind.speed} m/s.</div>
            <div>Clouds {data.clouds.all}%,</div>
            <div>Pressure {data.main.pressure} hpa</div>
          </div>
        </div>
      </div>
    )
  }

  /**
   * Convert temperature in Kelvin to Celsius degrees
   *
   * @private
   * @param temp - kelvin temperature
   * @returns temperature in Celsius degrees
   */
  kelvinToCelsius = (temp: number) => {
    return Math.round(10 * (temp - 273.15)) / 10
  }
}

/**
 * Exports.
 */
export { WeatherLabResultItem }
