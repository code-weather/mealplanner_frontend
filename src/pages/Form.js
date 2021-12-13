import {useState} from "react";
import {useNavigate} from "react-router-dom"
import Modal from "../components/Modal"

const Form = ({initialMeal, handleSubmit, buttonLabel}) => {

    const navigate = useNavigate()

    // The Form State
    const [formData, setFormData] = useState(initialMeal)
    const [isOpen, setIsOpen] = useState(false)

    // Handle Change to Update State when Input changes
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    // HandleSubmit for when the form submitted
    const handleSubmission = (event) => {
        // prevent the page from refresh
        event.preventDefault()
        // pass the formData to the handleSubmit function passes as props
        handleSubmit(formData)
        // push user back to main page
        navigate("/")
    }

    const modalStyle = {
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0 0 0'
    }

    return (
        <>
            <div style={modalStyle} onClick={() => console.log('clicked')}>
                <button onClick={() => setIsOpen(true)}>Open Modal</button>
    
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <form onSubmit={handleSubmission}>
                        <input
                            type="text"
                            onChange={handleChange}
                            value={formData.day}
                            name="day"
                            placeholder="day"
                        />
                        <input
                            type="text"
                            onChange={handleChange}
                            value={formData.meal}
                            name="meal"
                            placeholder="meal"
                        />
                        <input
                            type="text"
                            onChange={handleChange}
                            value={formData.name}
                            name="name"
                            placeholder="name"
                        />
                        <input type="submit" value={buttonLabel} />
                    </form>
                </Modal>
            </div>
        </>
    )
};

export default Form;