import apiHandler from "../../../../../utils/api-handler";
import { applySave } from "../../../../../services/db/applySaveService";
import httpStatusCodes from "../../../../../utils/httpStatusCodes";
import createHttpError from "http-errors";
import Chat from "../../../../../models/chat"
const handleApplySave = async (req, res) => {
  const { id } = req.query;
  const { jobId, action, dashboard } = req.body;
  const result = await applySave(id, jobId, action, dashboard);
  const chat = await Chat.findOne({jobId, employeeId: id});
  if(chat){
    if(action==="unapply" || action ==="unapplyAndSave"){
      // means Moved to save list
      chat.active = false;
    }
    else if (action==="unsave" || action==="applyAndUnsave"){
      //Moving to your interested jobs
      chat.active = true;
    }
    
    await chat.save()
  }
  if (result) {
    res.status(200).json({
      ...result,
      chat:chat
    });
  } else {
    throw createHttpError(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
};

export default apiHandler({ put: handleApplySave });
