import React, { useEffect, useState } from 'react'
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
	SuggestionItem,
	SuggestionsList,
	LanguageButton,
} = css

const API_KEY = 'a605bab14d55ddf652a3f2707b6de6de'
const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'
const GEO_API_OPTIONS = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '52dabac7b1msh101a45da4b50ff5p1068a3jsn096035db928e',
		'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
	},
}

const Main = props => {
	const [weatherData, setWeatherData] = useState(null)
	const [city, setCity] = useState('')
	const [error, setError] = useState(null)
	const [suggestions, setSuggestions] = useState([])
	const [lang, setLang] = useState('ru') // Добавили новое состояние для языка

	// Функция для получения погоды по координатам
	const fetchWeatherByCoords = async (lat, lon, currentLang) => {
		console.log('Fetching weather by coordinates:', lat, lon)
		try {
			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${currentLang}`
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error('Weather data not found for these coordinates.')
			}
			const data = await response.json()
			setWeatherData(data)
			setCity(data.name)
			setError(null)
		} catch (err) {
			console.error('Error fetching weather data by coordinates:', err)
			setError(err.message)
			setWeatherData(null)
		}
	}

	// Функция для получения погоды по названию города
	const fetchWeather = async (city, currentLang) => {
		if (city.trim() === '') {
			setError('Please enter a city name.')
			return
		}

		console.log('Fetching weather for city:', city)
		try {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${currentLang}`
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error('City not found')
			}
			const data = await response.json()
			setWeatherData(data)
			setError(null)
		} catch (err) {
			console.error('Error fetching weather data:', err)
			setError(err.message)
			setWeatherData(null)
		}
	}

	// Функция для поиска городов с автозаполнением
	const fetchCities = async inputValue => {
		if (inputValue.length < 3) {
			setSuggestions([])
			return
		}
		try {
			const response = await fetch(
				`${GEO_API_URL}?namePrefix=${inputValue}`,
				GEO_API_OPTIONS
			)
			const data = await response.json()
			setSuggestions(data.data || [])
		} catch (err) {
			console.error('Error fetching city suggestions:', err)
		}
	}

	const handleSearch = event => {
		event.preventDefault()
		fetchWeather(city, lang)
	}

	const handleLanguageToggle = () => {
		const newLang = lang === 'en' ? 'ru' : 'en'
		setLang(newLang)
		// Обновляем погоду, если она уже отображена
		if (weatherData) {
			fetchWeather(weatherData.name, newLang)
		}
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

	useEffect(() => {
		const handler = setTimeout(() => {
			fetchCities(city)
		}, 500)
		return () => {
			clearTimeout(handler)
		}
	}, [city])

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				position => {
					fetchWeatherByCoords(
						position.coords.latitude,
						position.coords.longitude,
						lang
					)
				},
				error => {
					console.error('Geolocation error:', error)
					setError('Геолокация недоступна. Пожалуйста, введите город вручную.')
				}
			)
		} else {
			setError('Геолокация не поддерживается вашим браузером.')
		}
	}, [])

	const handleSuggestionClick = cityName => {
		setCity(cityName)
		setSuggestions([])
		fetchWeather(cityName, lang)
	}

	const displayWeatherDescription = () => {
		if (weatherData) {
			// Перевод на русский, если lang='ru'
			if (lang === 'ru') {
				switch (weatherData.weather[0].main) {
					case 'Clear':
						return 'Ясно'
					case 'Clouds':
						return 'Облачно'
					case 'Rain':
						return 'Дождь'
					case 'Thunderstorm':
						return 'Гроза'
					case 'Snow':
						return 'Снег'
					case 'Mist':
					case 'Fog':
						return 'Туман'
					default:
						return weatherData.weather[0].description
				}
			}
			return weatherData.weather[0].description
		}
		return ''
	}

	const displayDetailLabel = label => {
		if (lang === 'ru') {
			switch (label) {
				case 'Humidity':
					return 'Влажность'
				case 'Wind speed':
					return 'Скорость ветра'
				case 'Pressure':
					return 'Давление'
				default:
					return label
			}
		}
		return label
	}

	return (
		<>
			<GlobalStyle />
			<AppContainer>
				<LanguageButton onClick={handleLanguageToggle}>
					{lang === 'ru' ? 'Сменить на English' : 'Switch to Русский'}
				</LanguageButton>
				<Title>Weather App</Title>

				<SearchForm onSubmit={handleSearch}>
					<SearchInput
						type='text'
						placeholder='Enter a city...'
						value={city}
						onChange={e => setCity(e.target.value)}
					/>
					<SearchButton type='submit'>Search</SearchButton>
				</SearchForm>
				{suggestions.length > 0 && (
					<SuggestionsList>
						{suggestions.map(s => (
							<SuggestionItem
								key={s.id}
								onClick={() => handleSuggestionClick(s.name)}
							>
								{s.name}, {s.countryCode}
							</SuggestionItem>
						))}
					</SuggestionsList>
				)}
				{weatherData && (
					<WeatherDisplay>
						<CityName>{weatherData.name}</CityName>
						<Temperature>{Math.round(weatherData.main.temp)}°C</Temperature>
						<WeatherIcon>
							{getWeatherIcon(weatherData.weather[0].main)}
						</WeatherIcon>
						<WeatherDescription>
							{displayWeatherDescription()}
						</WeatherDescription>
						<DetailsContainer>
							<DetailItem>
								<DetailValue>{weatherData.main.humidity}%</DetailValue>
								<DetailLabel>{displayDetailLabel('Humidity')}</DetailLabel>
							</DetailItem>
							<DetailItem>
								<DetailValue>{weatherData.wind.speed}km/h</DetailValue>
								<DetailLabel>{displayDetailLabel('Wind speed')}</DetailLabel>
							</DetailItem>
							<DetailItem>
								<DetailValue>{weatherData.main.pressure} hPa</DetailValue>
								<DetailLabel>{displayDetailLabel('Pressure')}</DetailLabel>
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
