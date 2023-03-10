const BASE_URL = `https://openweathermap.org/data`
const API_VERSION = `2.5`
const TYPE = 'like'
const SORT = 'population'
const CNT = 30
const APPID = 'b6907d289e10d714a6e88b30761fae22'

async function OpenWeatherAPI<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  let data = (await response.json()) as Promise<T>
  return data
}

async function Search<T>(search: string): Promise<T> {
  const url = `${BASE_URL}/${API_VERSION}/find`
  const query = [
    `q=${search}`,
    `type=${TYPE}`,
    `sort=${SORT}`,
    `cnt=${CNT}`,
    `appid=${APPID}`
  ].join('&')

  return await OpenWeatherAPI<T>(`${url}?${query}`)
}

export { OpenWeatherAPI }
export { Search }
