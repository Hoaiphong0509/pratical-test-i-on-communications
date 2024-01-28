import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { ComponentProvider } from 'src/context/ComponentContext';
import { router } from 'src/views/routes';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function App(){
	return (
		<>
			<ComponentProvider>
				<Toaster position='top-right'/>
				<RouterProvider router={router}/>
			</ComponentProvider>
		</>
	)
}

export default App
