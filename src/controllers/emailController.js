import emailService from "../services/emailService";

let handleSendEmail = async (req, res) => {
  let message = await emailService.sendEmail(req.body)
  return res.status(200).json(message);
};
let handleSendEmailContact= async (req, res) => {
  let message = await emailService.sendEmailContact(req.body)
  return res.status(200).json(message);
};
module.exports = {
  handleSendEmail: handleSendEmail,
  handleSendEmailContact:handleSendEmailContact
};
