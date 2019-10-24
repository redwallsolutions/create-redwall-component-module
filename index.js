import React, { useState } from 'react'
import { render } from 'react-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const Reset = createGlobalStyle`
  body {
    transition: .3s;
    padding: 0;
    margin: 0;
    background-color: ${props =>
			props.mode === 'light' ? 'white' : '#3C4043'};
    color: ${props => (props.mode === 'light' ? '#3C4043' : 'white')};
    * {
      box-sizing: border-box;
      font-family: Heveltica, Tahoma, Geneva, sans-serif;
    }
    .container {
      
      padding: 0;
      margin: 0;
      width: 100vw;
      padding: 2em;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
      label {
        margin: 0 5px;
      }
      input {
        padding: 0px;
        margin: 0px;
      }
    }
  }
`
const App = () => {
	const [mode, setMode] = useState('light')
	return (
		<ThemeProvider theme={{ mode }}>
			<div className="container">
				<Reset mode={mode} />
				<label htmlFor="light">Mode Light</label>
				<input
					id="light"
					name="mode"
					type="radio"
					onChange={() => setMode('light')}
				/>
				<label htmlFor="dark">Mode Dark</label>
				<input
					id="dark"
					name="mode"
					type="radio"
					onChange={() => setMode('dark')}
				/>
			</div>
			<div className="container">
				<button>Randomize Default</button>
				<button>Randomize Secondary</button>
				<button>Randomize Primary</button>
			</div>
		</ThemeProvider>
	)
}

render(<App />, document.getElementById('root'))
