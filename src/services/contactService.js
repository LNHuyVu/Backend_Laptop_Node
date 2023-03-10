import db from "../models/index";
let getAllContact = async (contactId) => {
  try {
    let contact = "";
    if (contactId === "ALL") {
      contact = await db.Contacts.findAll({});
    }
    if (contactId && contactId !== "ALL") {
      contact = await db.Contacts.findOne({
        where: { id: categoryId },
      });
    }
    return contact;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewContact = async (data) => {
  try {
    await db.Contacts.create({
      name: data.name,
      userid: data.userid,
      email: data.email,
      phone: data.phone,
      content: data.content,
      replyid: data.replyid,
      replydetail: data.replydetail,
    });
    return {
      errCode: 0,
      message: "Create contact OK",
    };
  } catch (e) {
    throw new Error(e);
  }
};
let deleteContact = async (contactId) => {
  let contact = await db.Contacts.findOne({
    where: { id: contactId },
  });
  if (!contact) {
    return {
      errCode: 2,
      message: "Not Exit ID contact",
    };
  }
  await db.Contacts.destroy({
    where: { id: contactId },
  });
  return {
    errCode: 0,
    message: "Delete contact OK",
  };
};
let editContact = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID contact",
      };
    }
    let contact = await db.Contacts.findOne({
      where: { id: data.id },
    });
    if (contact) {
    //   (contact.name = data.name),
        // (contact.userid = data.userid),
        // (contact.slug = data.slug),
        // (contact.content = data.content);
      contact.replyid = data.replyid;
      contact.replydetail = data.replydetail;
      await contact.save();
      return {
        errCode: 0,
        message: "Update contact OK",
      };
    } else {
      return {
        errCode: 2,
        message: "ID contact not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllContact: getAllContact,
  createNewContact: createNewContact,
  deleteContact: deleteContact,
  editContact: editContact,
};
