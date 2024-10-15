import {Router} from 'express'
import { CustomerController } from '../controllers/customer.controller.js'

const router = Router()

router.post('/newCustomer', CustomerController.createNewCustomer)
router.get('/allCustomers', CustomerController.getAllCustomers)
router.get('/customer/:id', CustomerController.getOneCustomer)
router.put('/updateCustomer/:id', CustomerController.updateCustomer)
router.delete('/delete/customer/:id', CustomerController.deleteCustomer)




export default router