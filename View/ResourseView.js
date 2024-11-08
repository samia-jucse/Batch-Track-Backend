
const CourseResourceModel = require('../Model/CourseResourseModel');

const BatchModel = require('../Model/BatchModel');

const addResourse = async (req,res) =>{

      const data = req.body ;

      const {courseCode,resourseTitle,resourseDescription,resourseFile,email } = data;
     console.log( "ghhgcfwvfb", resourseFile);
      const existigResourse = await CourseResourceModel.findOne({where :{resourseFile :resourseFile}})
      console.log('testing',existigResourse);
   
      if(!courseCode || !resourseTitle || !resourseDescription || ! resourseFile  )
         {
            return res.status(400).json({ message: " Missing Any Field " });
         }
     
     try{
      if(existigResourse )
         {
            return res.status(402).json({message: "Already Post This Resourse"})
         }
  else{
   const resourse = await CourseResourceModel.create({
      courseCode,
      resourseTitle,
      resourseDescription,
      resourseFile
    })
    return res.status(200).json({'data':resourse, message :"Course resource posted successfully"})
  }

     
     }
     catch(error)
     {
      return res.status(500).json({ error: "Internal Server Error" });
  
     }

}

module.exports = {addResourse} ;