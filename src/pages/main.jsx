import React, { useState } from 'react'
import css from '../styles/style.css'
import {
	WiCloudy,
	WiDaySunny,
	WiRain,
	WiThunderstorm,
	WiSnow,
	WiFog,
} from 'react-icons/wi'

const {
	CityName,
	Temperature,
	WeatherDescription,
	DetailsContainer,
	DetailItem,
	DetailValue,
	DetailLabel,
	WeatherIcon,
	GlobalStyle,
	AppContainer,
	SearchButton,
	WeatherDisplay,
	Title,
	SearchInput,
	SearchForm,
} = css

const API_KEY = 'a605bab14d55ddf652a3f2707b6de6de'

const Main = props => {
	const [weatherData, setWeatherData] = useState(null)
	const [city, setCity] = useState('')
	const [error, setError] = useState(null)

	const fetchWeather = async city => {
		if (city.trim() === '') {
			setError('Please enter a city name.')
			return
		}

		console.log('Отправляю запрос для города:', city)
		try {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`
			const response = await fetch(url)
			console.log('Ответ получен. Статус:', response.status, 'OK:', response.ok)

			if (!response.ok) {
				throw new Error('City not found')
			}

			const data = await response.json()
			setWeatherData(data)
			setError(null)
			console.log('Данные успешно загружены:', data)
		} catch (err) {
			console.error('Ошибка при получении данных:', err)
			setError(err.message)
			setWeatherData(null)
		}
	}

	const handleSearch = event => {
		event.preventDefault()
		fetchWeather(city)
	}

	const getWeatherIcon = weatherType => {
		switch (weatherType) {
			case 'Clear':
				return <WiDaySunny size={64} color='#FFD700' />
			case 'Clouds':
				return <WiCloudy size={64} color='#B0C4DE' />
			case 'Rain':
				return <WiRain size={64} color='#1E90FF' />
			case 'Thunderstorm':
				return <WiThunderstorm size={64} color='#FF4500' />
			case 'Snow':
				return <WiSnow size={64} color='#00BFFF' />
			case 'Mist':
			case 'Fog':
				return <WiFog size={64} color='#A9A9A9' />
			default:
				return null
		}
	}

	return (
		<>
			      <GlobalStyle /> 
			<AppContainer>
				        <Title>Weather App</Title>   
				<SearchForm onSubmit={handleSearch}>
					         {' '}
					<SearchInput
						type='text'
						placeholder='Enter a city...'
						value={city}
						onChange={e => setCity(e.target.value)}
					></SearchInput>
					          <SearchButton type='submit'>Search</SearchButton>     
				</SearchForm>
				{weatherData && (
					<WeatherDisplay>
						<CityName>{weatherData.name}</CityName> 
						<Temperature>{Math.round(weatherData.main.temp)}°C</Temperature>   
						<WeatherIcon>
							{getWeatherIcon(weatherData.weather[0].main)}
						</WeatherIcon>
						<WeatherDescription>
							{weatherData.weather[0].description}
						</WeatherDescription>
						<DetailsContainer>
							<DetailItem>
								<DetailValue>{weatherData.main.humidity}%</DetailValue>
								<DetailLabel>Humidity</DetailLabel>
							</DetailItem>
							<DetailItem>
								<DetailValue>{weatherData.wind.speed}km/h</DetailValue>
								<DetailLabel>Wind speed</DetailLabel>
							</DetailItem>
							<DetailItem>
								<DetailValue>{weatherData.main.pressure} hPa</DetailValue>
								<DetailLabel>Pressure</DetailLabel>
							</DetailItem>
						</DetailsContainer>
					</WeatherDisplay>
				)}
				{error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} 
			</AppContainer>
		</>
	)
}

export default Main
