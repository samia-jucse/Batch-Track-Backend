const NoticeModel = require("../Model/NoticeModel");
const UserModel = require("../Model/UserModel");




/**
 * Sends a department notice.
 *
 * @async
 * @function sendNotice
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing the notice details.
 * @param {string} req.body.title - Title of the notice.
 * @param {string} req.body.content - Content of the notice.
 * @param {string} req.body.audienceType - Type of audience for the notice (e.g., "students", "faculty").
 * @param {string} req.body.departmentId - Department identifier associated with the notice.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Responds with a success message if the notice is sent successfully, otherwise responds with an error message.
 */



const sendNotice = async (req, res) => {
    try {
      const { title, content, audienceType, departmentId } = req.body;
  
     
     
      req.user = { id: 'test_user_id' };  // Set a dummy user ID
      
       // Validate required fields
      if (!title || !content || !audienceType || !departmentId) {
        return res.status(400).json({
          message: 'Notice title, content, audience type, and department identifier are required',
        });
      }
  
      // Create a new notice entry in the database
      const notice = await NoticeModel.create({
        
        title,
        content,
        audienceType,
        departmentId,
        createdBy: req.user.id,  
        timestamp: new Date(),
      });
  
      res.status(200).json({
        message: 'Department notice sent successfully',
        
      });
    } catch (error) {
      console.error('Error sending department notice:', error);
      res.status(500).json({
        message: 'Failed to send the department notice. Please try again later',
      });
    }
  };





/**
 * Retrieves all department notices.
 *
 * @async
 * @function getAllNotices
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Responds with a list of all notices if retrieval is successful, otherwise responds with an error message.
 */

const getAllNotices = async (req, res) => {
    try {
      // Fetch all notices from the database
      const notices = await NoticeModel.findAll(); // Adjust query as necessary
      
      // Send the notices in the response
      res.status(200).json({
        message: 'Notices retrieved successfully',
        notices,
      });
    } catch (error) {
      console.error('Error retrieving notices:', error);
      res.status(500).json({
        message: 'Failed to retrieve notices',
      });
    }
  };
  
  

module.exports = { sendNotice,getAllNotices };

