"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNewsDetails = exports.UpdateNews = exports.DeleteNews = exports.GetAllActiveNews = exports.CreateNews = void 0;
const http_status_codes_1 = require("http-status-codes");
const news_model_1 = __importDefault(require("./news.model"));
const response_1 = __importDefault(require("../util/response"));
const news_service_1 = __importDefault(require("./news.service"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const ForbiddenError_1 = __importDefault(require("../error/error.classes/ForbiddenError"));
const constant_1 = __importDefault(require("../constant"));
//create News for admin
const CreateNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    // let file: any = req.file;
    let auth = req.auth;
    /*
      if (!file) {
        throw new BadRequestError("News image is required!");
      }
    */
    // console.log(body)
    //const category: any = await categoryService.findById(body.category);
    /*
    if (category.name == constants.CATEGORYTYPES.NEWS)
      throw new BadRequestError("Category type is not news!");
  */
    //construct news object
    const newNews = new news_model_1.default(body);
    newNews.addedBy = auth._id;
    //console.log(newNews)
    //const session = await startSession(); //start mongoose session
    let createdNews = null;
    try {
        // session.startTransaction(); //start transaction in session
        /*
        //upload image to cloudinary
        let uploadedObj: any = null;
        if (file) {
          uploadedObj = await commonService.uploadImageAndGetUri(
            file,
            constants.CLOUDINARY.FILE_NAME + "/news"
          );
        }
    
        if (uploadedObj != null) {
          newNews.newsImage = uploadedObj;
        }
        */
        createdNews = yield news_service_1.default.save(newNews, null); //save news
        //console.log(createdNews)
        //await session.commitTransaction();
    }
    catch (e) {
        //await session.abortTransaction();
        throw e;
    }
    finally {
        //session.endSession();
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "News created successfully!", createdNews);
});
exports.CreateNews = CreateNews;
//Get all active news for admin and user
const GetAllActiveNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let auth = req.auth;
    let activeNews = [];
    if (auth.role === constant_1.default.USER.ROLES.USER) {
        activeNews = yield news_service_1.default.findAllActiveNews();
    }
    else if (auth.role === constant_1.default.USER.ROLES.ADMIN) {
        activeNews = yield news_service_1.default.findAllActiveNewsByAddedUser(auth._id);
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "", activeNews);
});
exports.GetAllActiveNews = GetAllActiveNews;
//Delete news by id for admin
const DeleteNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newsId = req.params.id;
    let auth = req.auth;
    let news = yield news_service_1.default.findById(newsId);
    if (auth._id != news.addedBy._id.toString())
        throw new ForbiddenError_1.default("You are not allow to delete this news!");
    if (news) {
        news.status = constant_1.default.WELLKNOWNSTATUS.DELETED;
        yield news.save();
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "News deleted successfully!", {});
    }
    else {
        throw new NotFoundError_1.default("News not found!");
    }
});
exports.DeleteNews = DeleteNews;
/*
//Update news by id for admin
const UpdateNews = async (req: Request, res: Response) => {
  let newsId: string = req.params.id;
  let auth: any = req.auth;
  let body: any = req.body;
 // let file: any = req.file;

  let news: any = await newsService.findById(newsId);

  if (!news) throw new NotFoundError("News not found!");

  //valudate category
  if (body.category) {
    const category: any = await categoryService.findById(body.category);

    if (category.name == constants.CATEGORYTYPES.NEWS)
      throw new BadRequestError("Category type is not news!");
  }

  /*
  if (auth._id != news.addedBy._id.toString())
    throw new ForbiddenError("You are not allow to update this news!");

  //construct news update object expect image and addedBy
  for (let key in body) {
    if (key !== "newsImage" && key !== "addedBy") {
      news[key] = body[key];
    }
  }


  const session = await startSession(); //start mongoose session

  let updatedNews = null;

  try {

    /*
    session.startTransaction(); //start transaction in session

    //upload image to cloudinary
    let uploadedObj: any = null;
    if (file) {
      uploadedObj = await commonService.uploadImageAndGetUri(
        file,
        constants.CLOUDINARY.FILE_NAME + "/news"
      );

      //delete old image from cloudinary
      if (news.newsImage.public_id) {
        await commonService.deleteImageByUri(news.newsImage.public_id);
      }

      if (uploadedObj) {
        news.newsImage = uploadedObj;
      }
    }

  

    updatedNews = await newsService.save(news, null); //save news

    await session.commitTransaction();
  } catch (e) {
    session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "News updated successfully!",
    updatedNews
  );
};
*/
const UpdateNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newsId = req.params.id;
    const auth = req.auth;
    const body = req.body;
    const news = yield news_service_1.default.findById(newsId);
    if (!news)
        throw new NotFoundError_1.default("Appointment not found!");
    let today = new Date();
    /*
      if (appointment.appointmentDate < today)
        throw new BadRequestError("Appointment date is already passed!");
    
      if (appointment.status != constants.WELLKNOWNSTATUS.PENDING)
        throw new BadRequestError("Appointment is already approved or rejected!");
    
    
      if (news.addedBy.toString() != auth._id)
        throw new ForbiddenError("You are not authorized to perform this action!");
    
      */
    for (let key in body) {
        if (key !== "addedBy") {
            news[key] = body[key];
        }
    }
    try {
        yield news_service_1.default.save(news, null);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Appointment updated successfully!", news);
    }
    catch (e) {
        throw e;
    }
});
exports.UpdateNews = UpdateNews;
const GetNewsDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsId = req.params.newsId;
        const auth = req.auth;
        // Use your appointmentService to find the appointment by ID
        const news = yield news_service_1.default.findDetailsById(newsId);
        //console.log(newsId)
        if (!news) {
            throw new NotFoundError_1.default("News not found!");
        }
        /*
        
            if (appointment.addedBy.toString() !== auth._id) {
              throw new ForbiddenError("You are not authorized to view this appointment!");
            }
          
        */
        // Handle your response here, returning the appointment details
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "News details retrieved successfully!", news);
    }
    catch (e) {
        // Handle any errors that may occur during the process
        throw e;
    }
});
exports.GetNewsDetails = GetNewsDetails;
