import Customer from '../models/Customer.js'
export const CustomerController = {
    
    // Create new Customer
    createNewCustomer: async (req, res) => {
        try{
            const newCustomer = await Customer.create(req.body)
            console.log(newCustomer)
            return res.status(201).json(newCustomer)
        }
        catch(err){
            return res.status(500).json(err)
        }
    },

    // Get All Customers
    getAllCustomers: async (req, res) =>{
        try{
            const getAllCustomers = await Customer.find()
            res.status(200).json(getAllCustomers)
        }
        catch(err){
            return res.status(500).json(err)
        }
    },

    // Get one customer
    getOneCustomer: async (req, res) =>{
        const id = req.params.id
        try {
            const getOneCustomer = await Customer.findById(id)
            res.status(200).json(getOneCustomer)
        } 
        catch(err) {
            return res.status(500).json(err)
        }
    },

    // Update Customer
    updateCustomer: async (req, res) =>{
        const id = req.params.id
        const options = { new:true, runValidators:true}
        try {
            const updateCustomer = await Customer.findByIdAndUpdate(id, req.body, options)
            res.status(201).json(updateCustomer)
        } 
        catch(err) {
            return res.status(500).json(err)
        }
    },

    // Delete Customer
    deleteCustomer: async (req, res) =>{
        const id = req.params.id
        try {
            await Customer.findByIdAndDelete(id)
            return res.status(204).send()
        } 
        catch(err){
            return res.status(500).json(err)
        }
    }
    





}