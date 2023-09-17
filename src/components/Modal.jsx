import { useState } from "react";

const Modal = ({ isOpen, onClose, color, handleAddNote }) => {
    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: isOpen ? 'block' : 'none',
            zIndex: 1000,
        },
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        },
    };

    const style = `relative h-52 w-36 md:w-60 md:h-60 m-2 rounded-lg`


    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleBody = (event) => {
        setBody(event.target.value)
    }

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }




    const date = new Date()
    const timeStamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getUTCHours()}:${date.getMinutes()}`

    return (
        <div style={modalStyles.overlay}>
            {isOpen && (
                <div style={modalStyles.content}>
                    <button onClick={onClose} className=" text-gray-500 hover:text-gray-700">
                        X
                    </button>
                    <div className={style} style={{ backgroundColor: color }}>
                        <div className="p-2">
                            <div className="font-bold">
                                <input maxLength={20} onChange={handleTitle} placeholder="Your Title" className="bg-transparent placeholder:text-black" />
                            </div>
                            <div className="break-words h-20 md:h-52  overflow-scroll">
                                <textarea maxLength={200} onChange={handleBody} className="bg-transparent w-32 md:w-56 placeholder:text-black" placeholder="Jot Here" cols="40" rows="5"></textarea>

                            </div>
                            <div className="absolute bottom-0 left-0 z-10 p-2">
                                {timeStamp}
                            </div>
                        </div>
                    </div >

                    <div className="flex justify-center m-5">
                        <button onClick={() => handleAddNote(title, body, timeStamp)} className="btn-class-name">
                            <span className="back"></span>
                            <span className="front"></span>
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Modal;
