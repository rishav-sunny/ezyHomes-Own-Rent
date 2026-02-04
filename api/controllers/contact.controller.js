import prisma from "../lib/prisma.js";

export const createContact = async (req, res) => {
  const { email, name, subject, message } = req.body
  try {
    if(!email || !name || !subject || !message){
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields"
      })
    }
    const contact = await prisma.contact.create({
      data:{
        name,
        email,
        subject,
        message
      }
    })
    return res.status(201).json({
      success: true, 
      data: contact
    })
  } catch (error) {
      return res.status(500).json({
      success: false,
      message:'Internal Server Error'
    })
  }
}

export const getContacts = async (req, res)=> {
  try{
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return res.status(200).json({
      success: true,
      data: contacts
    })
  }catch(err){
    console.log('Error fetching contacts: ', err.message)
    return res.status(500).json({
      success: false, 
      message: "Internal server error"
    })
  }
}

export const updateContactStatus = async (req, res) => {
  try{
    const {id} = req.params
    const {status} = req.body
  
    const contact = await prisma.contact.update({
      where: { id },
      data: { status }
    })
    return res.status(200).json({
      success: true,
      data: contact
    })
  } catch(err){
    console.log("Error while updating the contacts: ", err.message)
    return res.status(500).json({
      success: false, 
      message: "Internal server error"
    })
  }
}
