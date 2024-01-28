import { debounce } from 'lodash';
import { useContext } from 'react';
import { ComponentType } from 'src/constants/app.constants.js';
import { ComponentContext } from 'src/context/ComponentContext.jsx';
import cloneDeep from 'lodash/cloneDeep'

const acceptUploadData = [
	{
		type: 'image/*',
		display: 'Image'
	},
	{
		type: 'video/*',
		display: 'Video'
	},
	{
		type: 'audio/*',
		display: 'Audio'
	}
]

const RenderPropsOfComponent = ({ propsComponent }) => {
	return <p>{JSON.stringify(propsComponent)}</p>
}

export const ConfigComponent = () => {
	const {
		currentComponent,
		setCurrentComponent,
		set,
		get
	} = useContext(ComponentContext)

	if(!currentComponent) return <h1>Empty</h1>

	const handlePropChange = (value, prop) => {
		const template = get()
		const tempTemplate = cloneDeep(template)

		const currentComponentIndex = tempTemplate.components?.findIndex(com => com.id === currentComponent.id)
		tempTemplate.components[currentComponentIndex] = {
			...tempTemplate.components[currentComponentIndex],
			props: {
				...tempTemplate.components[currentComponentIndex].props,
				[prop]: value
			}
		}

		const { id, component } = tempTemplate.components[currentComponentIndex]
		setCurrentComponent({
			id, component, props: {
				...tempTemplate.components[currentComponentIndex].props,
				[prop]: value
			}
		})

		debounce(() => {
			set(tempTemplate)
		}, 900)()
	}

	const handlePropChecked = (value) => {
		const template = get()
		const tempTemplate = cloneDeep(template)

		const currentComponentIndex = template.components?.findIndex(com => com.id === currentComponent.id)

		let acceptValues = [value]
		// eslint-disable-next-line no-prototype-builtins
		if(tempTemplate?.components[currentComponentIndex]?.props?.hasOwnProperty('accept')) {
			if(tempTemplate?.components[currentComponentIndex]?.props['accept'].includes(value)) {
				acceptValues = tempTemplate?.components[currentComponentIndex]?.props['accept'].filter(x => x !== value)
			} else {
				// eslint-disable-next-line no-unsafe-optional-chaining
				acceptValues = [...tempTemplate?.components[currentComponentIndex]?.props['accept'], value]
			}
		}

		tempTemplate.components[currentComponentIndex] = {
			...tempTemplate.components[currentComponentIndex],
			props: {
				...tempTemplate.components[currentComponentIndex].props,
				'accept': acceptValues
			}
		}

		const { id, component } = tempTemplate.components[currentComponentIndex]
		setCurrentComponent({
			id,
			component,
			props: {
				...tempTemplate.components[currentComponentIndex].props,
				'accept': acceptValues
			}
		})
	}

	const getChecked = (acceptValue) => {
		if(!currentComponent?.props?.accept) return false
		else return currentComponent?.props?.accept?.includes(acceptValue)
	}

	switch(currentComponent?.component) {
		case ComponentType.Paragrahp: {
			return (
				<div className='p-4'>
					<RenderPropsOfComponent propsComponent={currentComponent}/>
					<h3 className='font-bold'>Paragrahp text</h3>
					<input
						onChange={(e) => handlePropChange(e.target.value, 'text')}
						value={currentComponent?.props?.text ?? ''}
						className='w-[400px] rounded p-2 mt-1 border-2 border-indigo-600'/>
				</div>
			)
		}
		case ComponentType.Button: {
			return (
				<div className='p-4'>
					<RenderPropsOfComponent propsComponent={currentComponent}/>
					<h3 className='font-bold'>Button props</h3>
					<div className='flex w-full'>
						<label className='w-[120px] flex items-center'>Text:</label>
						<input
							onChange={(e) => handlePropChange(e.target.value, 'text')}
							placeholder='text'
							value={currentComponent?.props?.text ?? ''}
							className='w-[400px] rounded p-2 mt-1 border-2 border-indigo-600'
						/>
					</div>
					<div className='flex w-full'>
						<label className='w-[120px] flex items-center'>Alert message</label>
						<input
							onChange={(e) => handlePropChange(e.target.value, 'alertMessage')}
							placeholder='alert message'
							value={currentComponent?.props?.alertMessage ?? ''}
							className='w-[400px] rounded p-2 mt-1 border-2 border-indigo-600'
						/>
					</div>
				</div>
			)
		}
		case ComponentType.Upload: {
			return (
				<div className='p-4'>
					<RenderPropsOfComponent propsComponent={currentComponent}/>
					<h3 className='font-bold'>Accept upload</h3>
					<div className='flex w-full'>
						<label className='w-[120px] flex items-center'>Text:</label>
						<input
							onChange={(e) => handlePropChange(e.target.value, 'text')}
							placeholder='text'
							value={currentComponent?.props?.text ?? ''}
							className='w-[400px] rounded p-2 mt-1 border-2 border-indigo-600'
						/>
					</div>
					<div className='flex w-full gap-6'>
						<label className='w-[120px] flex items-center'>Accept</label>
						{acceptUploadData.map((elm) => {
							return (
								<div
									key={elm.type}
									className='flex gap-2'>
									<label htmlFor={elm.type}>{elm.display}</label>
									<input
										id={elm.type}
										onChange={(e) => handlePropChecked(e.target.value)}
										checked={getChecked(elm.type)}
										type='checkbox'
										value={elm.type}
									/>
								</div>
							)
						})}

					</div>
				</div>
			)
		}
		case ComponentType.Editor: {
			return (
				<div className='p-4'>
					<RenderPropsOfComponent propsComponent={currentComponent}/>
					<h3 className='font-bold'>Comming soon</h3>
				</div>
			)
		}
		default: {
			return <h1>Empty</h1>
		}
	}
};
