import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HomePage } from './pages'

const App = () => {
	return (
		<>
			<Routes>
				<Route index element={<HomePage />} />
			</Routes>
			<ToastContainer />
		</>
	)
}
export default App
