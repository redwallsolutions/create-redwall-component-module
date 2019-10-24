import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const Reset = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;

    .container {
      transition: .3s;
      padding: 0;
      margin: 0;
      width: 100vw;
      height: 100vh;
      padding: 2em;
      display: flex;
      justify-content: center;
      background-color: ${props =>
				props.mode === 'light' ? 'white' : '#3C4043'};
    }
  }
`
const App = () => {
	const [mode, setMode] = useState('light')
	return (
		<ThemeProvider theme={{ mode }}>
			<div className="container">
        <Reset mode={mode}/>
				<label>Mode Light</label>
				<input name="mode" type="radio" onChange={() => setMode('light')} />
				<label>Mode Dark</label>
				<input name="mode" type="radio" onChange={() => setMode('dark')} />
			</div>
		</ThemeProvider>
	)
}

render(<App />, document.getElementById('root'))
