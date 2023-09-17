import { useState, useEffect } from "react";
import NavBar from "./components/NavBar"
import NotesView from "./components/NotesView"
import SearchBar from "./components/SearchBar";
import AddNew from "./components/AddNew";
import Modal from "./components/Modal";
import EditModal from "./components/EditModal";

const App = () => {


  const [searchResult, setSearchResult] = useState([])
  const [modalOpen, setModelOpen] = useState(false)


  const [notes, setNotes] = useState([])

  useEffect(() => {
    const notesJSON = localStorage.getItem('notes');

    const storedNotes = JSON.parse(notesJSON);

    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const handleSearch = (event) => {
    const keyword = event.target.value

    if (keyword === '') {
      setSearchResult([])
      return
    }

    const result1 = notes.filter((note) => note.body.toLowerCase().includes(keyword.toLowerCase()))
    const result2 = notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()))
    const result3 = notes.filter((note) => note.timeStamp.toLowerCase().includes(keyword.toLowerCase()))


    setSearchResult([...result1, ...result2, ...result3])


  }




  const handleModelClose = () => {
    setModelOpen(false)
    setModalColor(null)
  }
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

  const [modalColor, setModalColor] = useState(null)

  const handleAddNew = () => {
    if (modalColor === null) {
      setModalColor(colors[random])
    }
    setModelOpen(true)
  }


  const handleAddNote = (title, body, timeStamp) => {
    console.log(title)
    console.log(body)
    if (title === '' || body === '') {
      alert("yeah i have covered edge cases!")
    }
    else {
      const newNote = {
        title: title,
        body: body,
        timeStamp: timeStamp
      }
      setNotes([newNote, ...notes])

      const notesJSON = JSON.stringify([newNote, ...notes]);
      localStorage.setItem('notes', notesJSON);

      setModelOpen(false)
    }
  }

  const handleDelete = (index) => {
    const newNotes = notes.filter((note, idx) => idx !== index)
    const notesJSON = JSON.stringify(newNotes);
    localStorage.setItem('notes', notesJSON);
    setNotes(newNotes)
  }

  const [openEditModal, setOpenEditModal] = useState(false)
  const [ptitle, setPtitle] = useState('')
  const [pbody, setPbody] = useState('')
  const [timeStamp, setTimeStamp] = useState('')
  const [eidx, setEidx] = useState(null)


  const handleOpenEditModal = (index, title, body, timeStamp) => {

    if (modalColor === null) {
      setModalColor(colors[random])
    }

    setPtitle(title)
    setPbody(body)
    setEidx(index)
    setTimeStamp(timeStamp)
    setOpenEditModal(true)

  }

  const handleEditModalClose = () => {
    setOpenEditModal(false)
    setModalColor(null)
  }


  const handleEditNote = (idx, title, body, timeStamp) => {

    if (title === '' || body === '') {
      alert("hahaha fill details")
    }
    else {
      const newNotes = notes.map((note, index) => {
        if (idx !== index) {
          return note
        }
        else {
          return {
            title: title,
            body: body,
            timeStamp: timeStamp
          }
        }
      })


      const notesJSON = JSON.stringify(newNotes);
      localStorage.setItem('notes', notesJSON);
      setNotes(newNotes)

      setOpenEditModal(false)
    }

  }
  return (
    <>
      <NavBar />
      <SearchBar handleSearch={handleSearch} handleAddNew={handleAddNew} />
      <EditModal isOpen={openEditModal} onClose={handleEditModalClose} color={modalColor} handleEditNote={handleEditNote} ptitle={ptitle} pbody={pbody} timeStamp={timeStamp} index={eidx} />
      <Modal isOpen={modalOpen} onClose={handleModelClose} color={modalColor} handleAddNote={handleAddNote} />
      <NotesView notes={searchResult.length === 0 ? notes : searchResult} handleDelete={handleDelete} openEditModal={handleOpenEditModal} />
    </>
  )
}

export default App