import NoteCard from "./NoteCard"

const NotesView = ({ notes, handleDelete, openEditModal }) => {
    return (
        <div className="flex flex-wrap justify-center">
            {notes.map((note, index) => <NoteCard key={index} note={note} index={index} handleDelete={handleDelete} openEditModal={openEditModal} />)}
        </div>
    )
}

export default NotesView