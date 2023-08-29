import apiHandler from "../../../../utils/api-handler";
import Chat from "../../../../models/chat";
const checkChat = async (req, res) => {
  const { employeeId, employerId, jobId } = req.body;
  const existingChat = await Chat.findOne({
    employeeId,
    employerId,
    jobId
  });
  if (existingChat) {
    return res.status(200).json({
      message: "already exists, returning the current chat",
      data: existingChat.toObject(),
    });
  }
  else{
    return res.status(404).json({
        message: "No chat exists",
        data: null,
      });
  }
  // Save the new chat to the database
};

export default apiHandler({ post: checkChat })
