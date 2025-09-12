import styled, { createGlobalStyle } from 'styled-components'

const css = {
	GlobalStyle: createGlobalStyle`

    body {
      margin: 0;
      padding: 0;
      font-family: 'Montserrat', sans-serif;
      color: #fff;
      background-color: #37353E;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
  `,

	AppContainer: styled.div`
		background: #444444;
		padding: 2rem;
		border-radius: 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		width: 90%;
		max-width: 500px;
		text-align: center;
		margin: 20px;
	`,

	Title: styled.h1`
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		color: #d3dad9;
	`,

	SearchForm: styled.form`
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 2rem;
		height: 50px;
		width: 100%;

		@media (min-width: 600px) {
			flex-direction: row;
		}
	`,

	SearchInput: styled.input`
		flex-grow: 1;
		padding: 10px 15px;
		border: none;
		border-radius: 10px;
		background-color: #715a5a;
		color: #fff;
		font-size: 20px;

		&::placeholder {
			color: #d3dad9;
			opacity: 0.7;
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 2px #d3dad9;
		}
	`,

	SearchButton: styled.button`
		background-color: #d3dad9;
		color: #37353e;
		border: none;
		padding: 10px 20px;
		border-radius: 10px;
		cursor: pointer;
		font-size: 1.2rem;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: #c1c9c8;
		}
	`,

	WeatherDisplay: styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
	`,

	CityName: styled.h2`
		font-size: 2.5rem;
		margin: 0;
		color: #d3dad9;
	`,

	Temperature: styled.div`
		font-size: 4rem;
		font-weight: 700;
		color: #d3dad9;
	`,

	WeatherDescription: styled.div`
		font-size: 1.2rem;
		margin: 0;
		color: #d3dad9;
		text-transform: capitalize;
		justify-content: center;
	`,

	DetailsContainer: styled.div`
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		width: 100%;
		margin-top: 2rem;
		background: rgba(113, 90, 90, 0.5);
		padding: 1rem;
		border-radius: 10px;
	`,

	DetailItem: styled.div`
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	`,

	DetailValue: styled.p`
		font-size: 1.1rem;
		margin: 0;
		font-weight: 700;
	`,

	DetailLabel: styled.p`
		font-size: 0.9rem;
		margin: 0;
		opacity: 0.8;
	`,

	WeatherIcon: styled.div`
		svg {
			width: 100px;
			height: 100px;
			color: #d3dad9;
			animation: spin 10s linear infinite;
		}

		@keyframes spin {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}
	`,
}

export default css
