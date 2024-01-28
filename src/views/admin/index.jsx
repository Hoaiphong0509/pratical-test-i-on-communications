import { useContext, useState } from 'react';
import {
	Mainboard,
	ActionArea,
	ConfigComponent
} from 'src/components/views/admin';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { nanoid } from 'nanoid'
import { ComponentType } from 'src/constants/app.constants.js';
import { ComponentContext } from 'src/context/ComponentContext';

const elementComponents = [
	{
		id: nanoid(),
		type: ComponentType.Paragrahp,
		display: 'Paragraph',
		props: {
			text: 'Paragraph'
		}
	},
	{
		id: nanoid(),
		type: ComponentType.Button,
		display: 'Button',
		props: {
			text: 'Button',
			alertMessage: 'Message'
		}
	},
	{
		id: nanoid(),
		type: ComponentType.Upload,
		display: 'Upload',
		props: {
			text: 'Button',
			accept: ['image/*']
		}
	},
	{
		id: nanoid(),
		type: ComponentType.Editor,
		display: 'Editor',
		props: {}
	}
]

const AdminPage = () => {
	const { get, set, create, currentComponent } = useContext(ComponentContext)
	const [currentInstance, setCurrentInstance] = useState(null)

	const onDragStart = (result) => {
		const { draggableId } = result
		setCurrentInstance(elementComponents.find(x => x.id === draggableId))
	}

	const onDragEnd = (result) => {
		setCurrentInstance(null)
		const { destination, draggableId } = result
		if(destination?.droppableId !== 'board') return

		const draggedElement = elementComponents.find((el) => el.id === draggableId)
		const currentTemplate = get()

		if(!currentTemplate) {
			create({
				templateId: nanoid(),
				components: [
					{
						id: nanoid(),
						component: draggedElement.type,
						props: draggedElement.props
					}
				]
			})
		} else {
			set({
				...currentTemplate,
				components: [
					...currentTemplate.components,
					{
						id: nanoid(),
						component: draggedElement.type,
						props: {}
					}
				]
			})
		}
	}

	return (
		<div className='py-4 select-none'>
			<ActionArea/>
			<div className='py-2'></div>
			<DragDropContext
				onDragEnd={onDragEnd}
				onDragStart={onDragStart}>
				<Droppable
					droppableId='main'
				>
					{(dropProvided) => (
						<div
							className='flex min-h-[85vh] h-auto mx-2'
							ref={dropProvided.innerRef} {...dropProvided.droppableProps}
						>
							<div className='flex flex-col w-1/12 p-4 border-2 border-black gap-2'>
								{elementComponents.map((elm, index) => {
									return (
										<Draggable
											key={elm.id}
											draggableId={elm.id}
											index={index}
										>
											{(providedDraggable) => {
												return (
													<div
														ref={providedDraggable.innerRef}
														{...providedDraggable.draggableProps}
														{...providedDraggable.dragHandleProps}
														className='p-2 rounded border-2 bg-white border-indigo-800'
													>
														{elm.display}
													</div>
												)
											}}
										</Draggable>
									)
								})}
							</div>
							<div className='w-11/12'>
								<div className='h-[70%]'>
									<Droppable droppableId='board'>
										{(providedBoard) => {
											return (
												<div
													className='w-full h-full'
													ref={providedBoard.innerRef}  {...dropProvided.droppableProps}>
													<Mainboard
														currentInstance={currentInstance}
													/>
												</div>
											)
										}}
									</Droppable>
								</div>
								<div className='min-h-[30%] h-auto border-l-0 border-b-2 border-r-2 border-black'>
									<ConfigComponent type={currentComponent ?? null}/>
								</div>
							</div>

						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
};

export default AdminPage;