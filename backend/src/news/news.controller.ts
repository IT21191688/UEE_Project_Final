import { Request, Response } from "express";
import { startSession } from "mongoose";
import { StatusCodes } from "http-status-codes";

import News from "./news.model";
import commonService from "../common/common.service";
import CustomResponse from "../util/response";
import newsService from "./news.service";
import categoryService from "../category/category.service";

import NotFoundError from "../error/error.classes/NotFoundError";
import BadRequestError from "../error/error.classes/BadRequestError";
import ForbiddenError from "../error/error.classes/ForbiddenError";
import constants from "../constant";

//create News for admin
const CreateNews = async (req: Request, res: Response) => {
  let body: any = req.body;
 // let file: any = req.file;
  let auth: any = req.auth;
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
  const newNews: any = new News(body);
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

    createdNews = await newsService.save(newNews,null); //save news

    //console.log(createdNews)

    //await session.commitTransaction();
  } catch (e) {
    //await session.abortTransaction();
    throw e;
  } finally {
    //session.endSession();
  }

  CustomResponse(
    res,
    true,
    StatusCodes.CREATED,
    "News created successfully!",
    createdNews
  );
};

//Get all active news for admin and user
const GetAllActiveNews = async (req: Request, res: Response) => {
  let auth = req.auth;

  let activeNews: any[] = [];
  if (auth.role === constants.USER.ROLES.USER) {
    activeNews = await newsService.findAllActiveNews();
  } else if (auth.role === constants.USER.ROLES.ADMIN) {
    activeNews = await newsService.findAllActiveNewsByAddedUser(auth._id);
  }

  CustomResponse(res, true, StatusCodes.OK, "", activeNews);
};

//Delete news by id for admin
const DeleteNews = async (req: Request, res: Response) => {
  let newsId = req.params.id;
  let auth: any = req.auth;

  let news: any = await newsService.findById(newsId);
  if (auth._id != news.addedBy._id.toString())
    throw new ForbiddenError("You are not allow to delete this news!");

  if (news) {
    news.status = constants.WELLKNOWNSTATUS.DELETED;
    await news.save();

    CustomResponse(res, true, StatusCodes.OK, "News deleted successfully!", {});
  } else {
    throw new NotFoundError("News not found!");
  }
};


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

const UpdateNews = async (req: Request, res: Response) => {
  const newsId: any = req.params.id;
  const auth: any = req.auth;
  const body: any = req.body;

  const news: any = await newsService.findById(newsId);

  if (!news) throw new NotFoundError("Appointment not found!");

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
    await newsService.save(news, null);
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Appointment updated successfully!",
      news
    );
  } catch (e) {
    throw e;
  }
};


const GetNewsDetails = async (req: Request, res: Response) => {
  try {
    const newsId: any = req.params.newsId;
    const auth: any = req.auth;

    // Use your appointmentService to find the appointment by ID
    const news: any = await newsService.findDetailsById(newsId);

    //console.log(newsId)

    if (!news) {
      throw new NotFoundError("News not found!");
    }
/*

    if (appointment.addedBy.toString() !== auth._id) {
      throw new ForbiddenError("You are not authorized to view this appointment!");
    }
  
*/
    // Handle your response here, returning the appointment details
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "News details retrieved successfully!",
      news
    );
  } catch (e) {
    // Handle any errors that may occur during the process
    throw e;
  }
};


export { CreateNews, GetAllActiveNews, DeleteNews, UpdateNews ,GetNewsDetails};
