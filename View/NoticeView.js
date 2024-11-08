const NoticeModel = require("../Model/NoticeModel");
const UserModel = require("../Model/UserModel");


const sendNotice = async (req, res) => {
    try {
      const { title, content, audienceType, departmentId } = req.body;
  
      // Temporarily skip authentication check for now
     
      req.user = { id: 'test_user_id' };  // Set a dummy user ID
  
      if (!title || !content || !audienceType || !departmentId) {
        return res.status(400).json({
          message: 'Notice title, content, audience type, and department identifier are required',
        });
      }
  
      const notice = await NoticeModel.create({
        
        title,
        content,
        audienceType,
        departmentId,
        createdBy: req.user.id,  // Now this will work
        timestamp: new Date(),
      });
  
      res.status(200).json({
        message: 'Department notice sent successfully',
        notice,
      });
    } catch (error) {
      console.error('Error sending department notice:', error);
      res.status(500).json({
        message: 'Failed to send the department notice. Please try again later',
      });
    }
  };
  
  

module.exports = { sendNotice };
