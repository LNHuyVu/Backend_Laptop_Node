import sliderService from "../services/sliderService"
let handleGetAllSlider = async(req, res)=>{
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        message: "Not Exit Topic ID",
        slider: [],
      });
    }
    let slider = await sliderService.getAllSlider(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      slider,
    });
}
let handleCreateNewSlider =async(req, res)=>{
    let message = await sliderService.createNewSlider(req.body);
    return res.status(200).json(message);
}
let handleEditSlider =async(req, res)=>{
    let data = req.body;
    let message = await sliderService.editSlider(data);
    return res.status(200).json(message);
}
let handleDeleteSlider =async(req, res)=>
{
    if (!req.body.id) {
        return res.status(200).json({
          errCode: 1,
          message: "Missing ID Slider",
        });
      }
      let message = await sliderService.deleteSlider(req.body.id);
      return res.status(200).json(message);
}
module.exports ={
    handleGetAllSlider:handleGetAllSlider,
    handleCreateNewSlider:handleCreateNewSlider,
    handleEditSlider:handleEditSlider,
    handleDeleteSlider:handleDeleteSlider,
};