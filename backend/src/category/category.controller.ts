import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import categoryService from "./category.service";
import Category from "./category.model";
import CustomResponse from "../util/response";
import constants from "../constant";
import BadRequestError from "../error/error.classes/BadRequestError";

const CreateCategory = async (req: Request, res: Response) => {
  let body: any = req.body;

  let types = Object.values(constants.CATEGORYTYPES);
  if (!types.includes(body.categoryType))
    throw new BadRequestError("Invalid category type!");

  const newCategory = new Category(body);

  let createdCategory = null;
  try {
    createdCategory = await categoryService.save(newCategory, null); //save category

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Category created successfully!",
      createdCategory
    );
  } catch (e) {
    throw e;
  }
};

const GetAllCategories = async (req: Request, res: Response) => {
  let type: any = req.query.type;

  //validate category types
  let types = Object.values(constants.CATEGORYTYPES);
  if (!types.includes(type))
    throw new BadRequestError("Invalid category type!");

  let categories = await categoryService.findAllByType(type);

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Categories fetched successfully!",
    categories
  );
};

const DeleteCategory = async (req: Request, res: Response) => {
  let categoryId: string = req.params.id;

  const category: any = await categoryService.findById(categoryId);

  if (!category) throw new BadRequestError("Category not found!");

  category.status = constants.WELLKNOWNSTATUS.DELETED;

  try {
    await categoryService.save(category, null); //save category

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Category deleted successfully!",
      {}
    );
  } catch (e) {
    throw e;
  }
};

const UpdateCategory = async (req: Request, res: Response) => {
  let categoryId: string = req.params.id;
  let body: any = req.body;

  const category: any = await categoryService.findById(categoryId);

  if (!category) throw new BadRequestError("Category not found!");

  //construct updated category
  for (let key in body) {
    if (key == "categoryType") {
      let types = Object.values(constants.CATEGORYTYPES);
      if (!types.includes(body[key]))
        throw new BadRequestError("Invalid category type!");
    }

    category[key] = body[key];
  }

  try {
    await categoryService.save(category, null); //save category

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Category updated successfully!",
      category
    );
  } catch (e) {
    throw e;
  }
};

export { CreateCategory, GetAllCategories, DeleteCategory, UpdateCategory };
