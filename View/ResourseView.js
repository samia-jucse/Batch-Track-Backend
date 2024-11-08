
const CourseResourceModel = require('../Model/CourseResourseModel');

const BatchModel = require('../Model/BatchModel');

const addResourse = async (req,res) =>{

      const data = req.body ;

      const {courseCode,resourseTitle,resourseDescription,resoursefile,email } = data;
   
      const resourse = await CourseResourceModel.create({
         courseCode,
         resourseTitle,
         resourseDescription,
         resoursefile
       })
       return res.status(200).json({'data':resourse, message :"Course resource posted successfully"})
     
     

}

module.exports = {addResourse} ;