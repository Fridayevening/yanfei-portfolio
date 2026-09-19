import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tokens.css'
import './styles.css'
import './styles/content.css'
import './styles/case-study.css'
import './styles/character.css'
import './styles/accessibility.css'
import './styles/profile-hub.css'
import './styles/retro-os.css'

createRoot(document.getElementById('root')!).render(<App />)
