import {
	createBrowserRouter
} from 'react-router-dom'
import DashboardPage from 'src/views/admin';
import ConsumerPage from 'src/views/consumer';
import LandingPage from 'src/views/landing';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage/>
	},
	{
		path: '/admin',
		element: <DashboardPage/>
	},
	{
		path: '/consumer',
		element: <ConsumerPage/>
	}
])

export { router }