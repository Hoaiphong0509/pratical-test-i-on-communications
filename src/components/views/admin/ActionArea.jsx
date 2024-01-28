import { useContext } from 'react';
import { ComponentContext } from 'src/context/ComponentContext.jsx';
import { useNavigate } from 'react-router-dom';

export const ActionArea = () => {
	const {
		save,
		clearBoard,
		undo,
		redo,
		exportTemplate,
		importTemplate
	} = useContext(ComponentContext)
	const navigate = useNavigate();

	const buttons = [
		{
			display: 'Save',
			as: 'button',
			action: save
		},
		{
			display: 'Clear',
			as: 'button',
			action: clearBoard
		},
		{
			display: 'Undo',
			as: 'button',
			action: undo
		},
		{
			display: 'Redo',
			as: 'button',
			action: redo
		},
		{
			display: 'Export',
			as: 'button',
			action: exportTemplate
		},
		{
			display: 'Import',
			as: 'input',
			action: importTemplate
		},
		{
			display: 'View',
			as: 'button',
			action: () => {
				save()
				navigate('/consumer')
			}
		}
	]

	return (
		<div
			className='flex justify-center gap-2'
		>
			{buttons.map((btn, index) => {

				if(btn.as === 'input') {
					return (
						<label
							key={index}
							className='px-4 py-2 rounded bg-indigo-700 text-white cursor-pointer'>
							Import
							<input
								className='hidden'
								onChange={btn.action}
								accept='application/JSON'
								type='file'
							/>
						</label>
					)
				} else
					return (
						<button
							key={index}
							onClick={btn.action}
							className='px-4 py-2 rounded bg-indigo-700 text-white'
						>
							{btn.display}
						</button>
					)
			})}
		</div>
	);
};
