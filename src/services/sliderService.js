import db from "../models/index";
let checkSliderName = async (sliderName) => {
  try {
    let slider = await db.Sliders.findOne({
      where: { name: sliderName },
    });
    if (slider) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
};
let getAllSlider = async (sliderId) => {
  try {
    let slider = "";
    if (sliderId === "ALL") {
      slider = await db.Sliders.findAll({});
    }
    if (sliderId && sliderId !== "ALL") {
      slider = await db.Sliders.findOne({
        where: { id: sliderId },
      });
    }
    return slider;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewSlider = async (data) => {
  try {
    let check = await checkSliderName(data.name);
    if (check === true) {
      return {
        errCode: 1,
        message: "Your name slider is already in used",
      };
    } else {
      await db.Sliders.update(
        { status: 0 },
        {
          where: {
            position: data.position,
          },
        }
      );
      await db.Sliders.create({
        name: data.name,
        link: data.link,
        image: data.image,
        position: data.position,
        createdBy: data.createdBy,
        status: data.status,
      });
      return {
        errCode: 0,
        message: "Create slider OK",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let editSlider = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Slider",
      };
    }
    let slider = await db.Sliders.findOne({
      where: { id: data.id },
    });
    if (slider) {
      if (!data.name) {
        await db.Sliders.update(
          { status: 0 },
          {
            where: {
              position: slider.position,
            },
          }
        );
      }
    }
    if (slider) {
      (slider.name = data.name),
        (slider.link = data.link),
        (slider.image = data.image),
        (slider.position = data.position),
        (slider.status = data.status);
      await slider.save();
      return {
        errCode: 0,
        message: "Update slider OK",
      };
    } else {
      return {
        errCode: 2,
        message: "Slider not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteSlider = async (sliderId) => {
  let slider = await db.Sliders.findOne({
    where: { id: sliderId },
  });
  if (!slider) {
    return {
      errCode: 2,
      message: "Not Exit Slider",
    };
  }
  await db.Sliders.destroy({
    where: { id: sliderId },
  });
  return {
    errCode: 0,
    message: "Delete Slider OK",
  };
};
module.exports = {
  getAllSlider: getAllSlider,
  createNewSlider: createNewSlider,
  editSlider: editSlider,
  deleteSlider: deleteSlider,
};
