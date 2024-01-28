import React from 'react'
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { ComponentType, TEMPLATE_DATA } from 'src/constants/app.constants';
import { Editor } from 'react-draft-wysiwyg';
import { deepParseJson } from 'src/utils/deep-parse-json';

const RenderComponentConsumer = ({ id, component, props }) => {
	switch(component) {
		case ComponentType.Paragrahp:
			return <p>{props?.text ?? "Paragrahp"}</p>
		case ComponentType.Button:
			return (
				<button
					className='px-4 py-2 rounded bg-indigo-700 text-white'
					onClick={() => alert(props?.alertMessage)}
				>
					{props?.text ?? "Button"}
				</button>
			)
		case ComponentType.Upload:
			return (
				<label
					htmlFor={id}
					className='cursor-pointer flex gap-2 items-center px-4 py-2 rounded bg-amber-500 text-white'
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
					<input
						id={id}
						type='file'
						className='hidden'
						accept={props?.accept?.join(',') ?? ""}
					/>
				</label>
			)
		case ComponentType.Editor:
			return (
				<div className='border-2 rounded p-2 w-[600px]'>
					<Editor
						placeholder='Typing amazing...'
						editorStyle={
							{
								marginTop: '-5px',
								height: '100px',
								background: 'white'
							}}
					/>
				</div>
			)
		default: {
			return <>Empty</>
		}
	}
}

const ConsumerPage = () => {
	const [templateConsumer] = useState(deepParseJson(localStorage.getItem(TEMPLATE_DATA) ?? {}))

	if(isEmpty(templateConsumer) || Object.keys(templateConsumer).length === 0) {
		return (
			<div>Nothing</div>
		)
	}

	return (
		<div className='flex flex-col items-center gap-4 my-3'>
			{templateConsumer.components.map((component, index) => {
				return (
					<React.Fragment key={index}>
						<RenderComponentConsumer {...component}/>
					</React.Fragment>
				)
			})}
		</div>
	);
};

export default ConsumerPage;