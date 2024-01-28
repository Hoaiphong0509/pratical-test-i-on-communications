import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
	const navigate = useNavigate()
	useEffect(() => {
		navigate('/admin')

	}, [navigate]);

	return <></>
};

export default LandingPage;