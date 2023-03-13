import contactService from "../services/contactService";
let handleGetAllContact = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing request ID contact",
      contact: [],
    });
  }
  let contact = await contactService.getAllContact(id);
  return res.status(200).json({
    errCode: 0,
    message: "OK",
    contact,
  });
};
let handleCreateNewContact = async (req, res) => {
  let message = await contactService.createNewContact(req.body);
  return res.status(200).json(message);
};
let handleDeleteContact = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing ID contact",
    });
  }
  let message = await contactService.deleteContact(req.body.id);
  return res.status(200).json(message);
};
let handleEditContact=async(req, res)=>{
    let data = req.body;
    let message = await contactService.editContact(data);
    return res.status(200).json(message);
}
module.exports = {
  handleGetAllContact: handleGetAllContact,
  handleCreateNewContact: handleCreateNewContact,
  handleDeleteContact: handleDeleteContact,
  handleEditContact:handleEditContact,
};
