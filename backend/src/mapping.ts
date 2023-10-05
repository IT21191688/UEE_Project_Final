import AppointmentRouter from "./appointment/appointment.route";
import AuthRouter from "./auth/auth.route";
import CategoryRouter from "./category/category.route";
import CertificateRouter from "./certificate/certificate.route";
import ConversationRouter from "./chat/conversation/conversation.route";
import MessageRouter from "./chat/message/message.route";
import constants from "./constant";
import JobRouter from "./job/job.route";
import NewsRouter from "./news/news.route";
import OrganizationRouter from "./organization/organization.route";
import UserRouter from "./user/user.route";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/user"), UserRouter);
  app.use(constants.API.PREFIX.concat("/auth"), AuthRouter);
  app.use(constants.API.PREFIX.concat("/organization"), OrganizationRouter);
  app.use(constants.API.PREFIX.concat("/appointment"), AppointmentRouter);
  app.use(constants.API.PREFIX.concat("/news"), NewsRouter);
  app.use(constants.API.PREFIX.concat("/category"), CategoryRouter);
  app.use(constants.API.PREFIX.concat("/conversation"), ConversationRouter);
  app.use(constants.API.PREFIX.concat("/message"), MessageRouter);
  app.use(constants.API.PREFIX.concat("/job"), JobRouter);
  app.use(constants.API.PREFIX.concat("/certificate"), CertificateRouter);
};

export default requestMappings;
