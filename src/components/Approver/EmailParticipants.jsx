import React,{ useState, useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap' 
import { useSelector } from 'react-redux'
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EmailParticipants = (props) => {
    // 
    const {
        setEmailParticipantsFields
    } = props

    // React Select
    const animatedComponents = makeAnimated();
    // Participants Email List
    const userEmail = useSelector(state => state.userEmail)
    const { emails:participants } = userEmail

    // useState
    const [selectedParticipant, setSelectedParticipant] = useState([])
    const [additionalRemarks, setAdditionalRemarks] = useState('')
    
    // Fields
    const [fields, setFields] = useState({
        additional_remarks: '', // additional remarks
        email: '',
    })

    // console.warn(fields)
    // const [editorState, setEditorState] = useState(EditorState.createEmpty())

    // Email Participants
    const [participantListOptions, setParticipantListOptions] = useState([])
    // 
    const changeValueHandler = (fieldName, value) => {
        const newField = fields
        newField[fieldName] = value
        setFields(newField)
    }

    // Object to get selected Email Participants
    const handleSelectedParticipants = (options) => {
        setSelectedParticipant(options)
        changeValueHandler('email', options)
        setEmailParticipantsFields(fields)
    }

    // 
    useEffect(() => {
        // setState
        setParticipantListOptions(participants || [])
        // Selected Participants 
        // setSelectedParticipant(email_participants || [])
    },[participants])

    // 
    useEffect(() => {
        changeValueHandler('additional_remarks', additionalRemarks)
        changeValueHandler('email', selectedParticipant)
    },[selectedParticipant, 
        additionalRemarks])

 //
 return (
    <>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                <Form.Label>Send email copy to: </Form.Label>
                <CreatableSelect
                    closeMenuOnSelect={false}
                    isMulti
                    components={animatedComponents}
                    options={participantListOptions}
                    onChange={(e) => {
                        handleSelectedParticipants(e)
                    }}
                    value={selectedParticipant}
                    // styles={reactSelectCustomStyles}
                    // defaultValue={[colourOptions[4], colourOptions[5]]}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                {/* <Editor 
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                /> */}
                <Form.Group className="mb-3">
                    <Form.Label>Additional Remarks</Form.Label>
                    <Form.Control 
                        size="sm"
                        as="textarea" 
                        rows={3} 
                        value={additionalRemarks}
                        onChange={(e) => {
                            changeValueHandler('additional_remarks', e.target.value)
                            setAdditionalRemarks(e.target.value)
                            setEmailParticipantsFields(fields)
                        }}
                    />
                </Form.Group>
            </Col>
        </Row>
    </>
  )
}

export default EmailParticipants