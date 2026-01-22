import Contact from "../models/Contact.js";
import sendMessage from "../utils/Contact.util.js"


async function contactUs(req, res) {
    try {
        const { fullName, email, subject, message } = req.body

        if (!fullName || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const data = {...req.body}

        const contact = await Contact.create(data)

        await sendMessage({fullName, message, email, subject})
        res.status(201).json({ success: true, message: "Message sent successfully", data: contact });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function getContacts(req, res){
    try {
        const contacts = await Contact.find()
        if (contacts.length === 0) {
            return res.status(404).json({ success: false, message: "No contacts found"})
        }
        res.status(200).json({ success: true, data: contacts})   
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getContactById(req, res) {
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({ success: false, message: "No contact found"})
        }
        res.status(200).json({ success: true, data: contact})   
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function updateContact(req, res) {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if (!contact) {
            return res.status(404).json({ success: false, message: "No contact found"})
        }
        res.status(200).json({ success: true, message: "Contact updated successfully", data: contact })   
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function deleteContact(req, res){
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id)
        if(!contact){
            return res.status(404).json({ success: false, message: "No contact found"})
        }
        res.status(200).json({ success: true, message: "Contact deleted successfully"})   
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { contactUs, getContacts, getContactById, updateContact, deleteContact }