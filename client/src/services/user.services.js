import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL: 'http://localhost:8000/api'
})

//Create
export const createPatient = async patientData => {
    try{
        const res = await PATIENT_INSTANCE.post(`/patient/create`, patientData)
        return res.data
    }catch (error){
        throw error
    }
}

//Read 

export const getAllPatients = async () => {
    try{
        const res = await PATIENT_INSTANCE.get('/patients')
        return res.data
    }catch (error){
        throw error
    }
}

export const getPatientById = async id => {
    try{ 
        const res = await PATIENT_INSTANCE.get(`/patient/${id}`)
        return res.data
    }catch (error){
        throw error
    }
}

//Update
export const updatePatient = async patientData => {
    try{
        const res = await PATIENT_INSTANCE.put(`/books/${patientData._id}`, patientData)//takes data from form to be the req.body in our book controller.
        return res.data
    }catch (error){
        throw error
    }
}

//Delete

export const deletePatient = async id => {
    try{
        const res = await PATIENT_INSTANCE.delete(`/patients/${id}`)
        return res.data //will return the deleted objecct, which is usefull incase of accidents. 
    }catch (error){
        throw error
    }
}