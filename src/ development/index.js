import React from 'react'
import { Input, Button } from '@material-tailwind/react'
import axios from '../store/axios'
export default function index() {
    async function handleSubmit(e) {
        try {
            e.preventDefault()
            // const name = e.target.name.value.toLowerCase().trim()
            const phoneNumber = e.target.phoneNumber.value.toLowerCase().trim()
            const response = await axios.post('/send-code',{
                phoneNumber
            })

            console.log(response)

            // console.log({ name, phoneNumber })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div style={{display:'flex',justifyContent:"center"}}>
            <form onSubmit={handleSubmit}>
                {/* <Input type="text" style={{ width: 300 }} name='name' /> */}
                <Input type="text" style={{ width: 300 }} name='phoneNumber' defaultValue='+998' />
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}
