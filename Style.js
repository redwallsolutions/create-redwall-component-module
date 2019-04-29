import styled from 'styled-components'
import color from 'color'
import RedwallColorPallete from 'color-pallete-component-module'
import Theming from 'theming-component-module'

const theme = Theming.createThemeWithAppearance()

const ItsWorkingStyled = styled.h2`
  color: ${props => theme(props).color};
`

ItsWorkingStyled.defaultProps = {
  appearance: 'primary',
  theme: {
    mode: 'light'
  }
}

export {ItsWorkingStyled}
