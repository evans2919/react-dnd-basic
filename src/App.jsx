import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialToDos = JSON.parse(localStorage.getItem("todos")) || [
    {
        id: 1,
        title: "Pokemon Rubi",
    },

    {
        id: 2,
        title: "Pokemon Diamante",
    },
    {
        id: 3,
        title: "Pokemon Perla",
    },
    {
        id: 4,
        title: "Pokemon Cristal",
    },
];
const App = () => {
    const [toDos, setToDos] = useState(initialToDos);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(toDos));
    }, [toDos]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const dropStart = result.source.index;
        const dropEnd = result.destination.index;
        const copyArray = [...toDos];
        const [reorderedItems] = copyArray.splice(dropStart, 1);
        copyArray.splice(dropEnd, 0, reorderedItems);
        setToDos(copyArray);
    };

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <h1>Pokemon Drag and Drop</h1>
                <Droppable droppableId="todos">
                    {(droppableProvider) => (
                        <ul
                            ref={droppableProvider.innerRef}
                            {...droppableProvider.droppableProps}
                        >
                            {toDos.map((toDo, index) => (
                                <Draggable
                                    draggableId={`${toDo.id}`}
                                    key={toDo.id}
                                    index={index}
                                >
                                    {(draggableProvider) => (
                                        <li
                                            ref={draggableProvider.innerRef}
                                            {...draggableProvider.dragHandleProps}
                                            {...draggableProvider.draggableProps}
                                        >
                                            <br></br>
                                            {toDo.title}
                                            <br></br>
                                            <br></br>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {droppableProvider.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default App;
