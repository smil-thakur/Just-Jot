
import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'

const NoteCard = ({ note, index, handleDelete, openEditModal }) => {

    const colors = [
        "#E966A0", // White
        "#F1D4E5", // Black
        "#FFD95A", // Red
        "#19A7CE", // Green
        "#E96479", // Blue
        "#42855B", // Yellow
        "#B25068", // Magenta
        "#FF8C32", // Cyan
        "#D3ECA7", // Orange
        "#A5E1AD", // Purple
        "#C4B6B6", // Dark Green
        "#F4ABC4", // Pink
        "#D7385E", // Brown
        "#00B7C2", // Teal
        "#FDCB9E", // Gray
    ];

    let random = Math.floor(Math.random() * colors.length)
    const style = `relative h-52 w-36 md:w-60 md:h-60 m-2 rounded-lg bg-[${colors[random]}]`
    return (
        <div className={style}>

            <div className="p-2">
                <div className="flex font-bold items-center justify-between">
                    <div>
                        {note.title}
                    </div>
                    <div className='flex'>
                        <MdDelete className='m-1' onClick={() => handleDelete(index)} />
                        <AiFillEdit className='m-1' onClick={() => openEditModal(index, note.title, note.body, note.timeStamp)} />
                    </div>
                </div>
                <div className="break-words h-20 md:h-52  overflow-scroll"> {/* Apply height and overflow properties */}
                    {note.body}
                </div>
                <div className="absolute bottom-0 left-0 z-10 p-2">
                    {note.timeStamp}
                </div>
            </div>
        </div >
    )
}

export default NoteCard