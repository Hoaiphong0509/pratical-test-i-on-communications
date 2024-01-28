import { createContext, useState } from 'react'
import toast from 'react-hot-toast';
import { SNAPSHOT, TEMPLATE_DATA } from 'src/constants/app.constants';
import { deepParseJson } from 'src/utils/deep-parse-json'
import cloneDeep from 'lodash/cloneDeep'

const ComponentContext = createContext()

const ComponentProvider = ({ children }) => {
	const [snapshot, setSnapshot] = useState(deepParseJson(localStorage.getItem(SNAPSHOT)) ?? {})
	const [templateData, setTemplateData] = useState(deepParseJson(localStorage.getItem(TEMPLATE_DATA)) ?? null)
	const [currentComponent, setCurrentComponent] = useState(null)
	const [currentSnapshot, setCurrentSnapshot] = useState(Object.keys(deepParseJson(localStorage.getItem(SNAPSHOT)) ?? {}).length)

	const saveSnapshot = (payload) => {
		const currentSnapshot = Object.keys(snapshot).length
		const changedSnapshot = {
			...cloneDeep(snapshot),
			[currentSnapshot + 1]: payload
		}
		setSnapshot(changedSnapshot)
		setCurrentSnapshot(currentSnapshot + 1)
		localStorage.setItem(SNAPSHOT, JSON.stringify(changedSnapshot))
	}

	const save = () => {
		localStorage.setItem(TEMPLATE_DATA, JSON.stringify(templateData))
		toast.success('Save successfully')
	}
	const create = (payload) => {
		setTemplateData(payload)
		saveSnapshot(payload)
	}

	const set = (payload) => {
		setTemplateData(payload)
		saveSnapshot(payload)
	}

	const get = () => templateData

	const getNumberInstances = () => templateData?.components?.length ?? 0

	const clearBoard = () => {
		if(!templateData) return
		setTemplateData(null)
		setCurrentComponent(null)
		localStorage.setItem(TEMPLATE_DATA, JSON.stringify(null))

		saveSnapshot(null)
		toast.success('Clear successfully')
	}

	const undo = () => {
		if(!templateData) {
			toast('You cannot undo anymore!',
				{
					icon: '❌',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff'
					}
				}
			);
			return;
		}
		if(currentSnapshot === 1) {
			setTemplateData(null)
			setCurrentSnapshot(0)
			setCurrentComponent(null)
			return
		}
		setTemplateData(snapshot[currentSnapshot - 1])
		setCurrentSnapshot(prev => prev - 1)
	}

	const redo = () => {
		if(currentSnapshot >= Object.keys(snapshot ?? {}).length) {
			toast('You cannot redo anymore!',
				{
					icon: '❌',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff'
					}
				}
			);
			return
		}
		setTemplateData(snapshot[currentSnapshot + 1])
		setCurrentSnapshot(prev => prev + 1)
	}

	const exportTemplate = () => {
		const filename = 'data.json';
		const jsonStr = JSON.stringify(templateData);

		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	const importTemplate = (event) => {
		const file = event.target.files[0]

		if(file) {
			const fileReader = new FileReader();
			fileReader.onloadend = () => {
				const fileContent = fileReader.result;
				try {
					const parsedData = deepParseJson(fileContent);
					setTemplateData(parsedData)
					toast.success('Import template successfully')
				} catch (error) {
					toast.error('Something went wrong. Please try again')
				}
			};
			fileReader.readAsText(file);
		}
	}

	const values = {
		snapshot,
		templateData,
		create,
		save,
		clearBoard,
		set,
		get,
		getNumberInstances,
		currentComponent,
		setCurrentComponent,
		undo,
		redo,
		exportTemplate,
		importTemplate
	}

	return <ComponentContext.Provider value={values}>{children}</ComponentContext.Provider>
}

export { ComponentContext, ComponentProvider }