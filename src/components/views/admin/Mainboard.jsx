import { isEmpty } from 'lodash';
import { capitalize } from 'lodash/string.js';
import React, { useContext, useState } from 'react';
import { ComponentType } from 'src/constants/app.constants.js';
import { ComponentContext } from 'src/context/ComponentContext';
import { Editor } from 'react-draft-wysiwyg';

const RenderComponent = ({ props, component, id }) => {
	const {
		setCurrentComponent
	} = useContext(ComponentContext)
	switch(component) {
		case ComponentType.Paragrahp: {
			return (
				<button
					onClick={() => setCurrentComponent({ id, component, props })}
					className='outline-0 border-0'
				>
					{isEmpty(props?.text) ? 'Paragraph' : props?.text}
				</button>
			)
		}
		case ComponentType.Button: {
			return (
				<button
					onClick={() => setCurrentComponent({ id, component, props })}
					className='px-4 py-2 rounded bg-cyan-700 text-white'
				>
					{isEmpty(props?.text) ? 'Button' : props?.text}
				</button>
			)
		}
		case ComponentType.Upload: {
			return (
				<button
					onClick={() => setCurrentComponent({ id, component, props })}
					className='flex gap-2 items-center px-4 py-2 rounded bg-amber-500 text-white'
				>
					<span>
						{isEmpty(props?.text) ? 'Upload' : props?.text}
					</span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='1em'
						height='1em'
						viewBox='0 0 24 24'>
						<path
							fill='currentColor'
							d='M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-7 4v-5h2v3h12v-3h2v5z'/>
					</svg>
				</button>
			)
		}
		case ComponentType.Editor: {
			return (
				<div className='border-2 rounded p-2 w-[600px]'>
					<button
						className='px-4 py-2 rounded bg-white text-black border-black'
						onClick={
							() => setCurrentComponent({
								id,
								component,
								props
							})}
					>
						Config
					</button>
					<Editor
						placeholder='Typing amazing...'
						readOnly={true}
						editorStyle={
							{
								marginTop: '-5px',
								height: '50px',
								background: 'white'
							}}
					/>
				</div>
			)
		}
		default: {
			return <div>Empty</div>
		}
	}
}

export const Mainboard = React.forwardRef((props, ref) => {
	const {
		get,
		getNumberInstances
	} = useContext(ComponentContext)
	const { currentInstance } = props
	console.log('currentInstance', currentInstance)


	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e) => {
		setMousePosition({ x: e.clientX, y: e.clientY });
	};
	return (
		<div
			ref={ref}
			className='border-2 border-l-0 border-black p-4 h-full flex'
			onMouseMove={handleMouseMove}
		>
			<div className='min-w-[150px]'>
				<p className='text-md'>
					Mouse: {`(${mousePosition.x}, ${mousePosition.y})`}
				</p>
				<p className='text-md'>
					Dragging: {!currentInstance ? '' : `${capitalize(currentInstance.type)}`}
				</p>
				<p className='text-md'>
					Instances: {getNumberInstances()}
				</p>
			</div>
			<div className='flex flex-col gap-2 items-center w-full'>
				{get()?.components?.map((com, index) => {
					return (
						<React.Fragment key={index}>
							<RenderComponent
								{...com}
							/>
						</React.Fragment>
					)
				})}
			</div>
		</div>
	);
});


