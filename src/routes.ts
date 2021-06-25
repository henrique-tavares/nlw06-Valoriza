import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListComplimentsByReceiverController } from "./controllers/ListComplimentsByReceiverController";
import { ListComplimentsBySenderController } from "./controllers/ListComplimentsBySenderController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

export const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listComplimentsBySenderController = new ListComplimentsBySenderController();
const listComplimentsByReceiverController = new ListComplimentsByReceiverController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);
router.post('/login', authenticateUserController.handle);

router.get('/users/compliments/sender', ensureAuthenticated, listComplimentsBySenderController.handle);
router.get('/users/compliments/receiver', ensureAuthenticated, listComplimentsByReceiverController.handle);
router.get('/tags', ensureAuthenticated, listTagsController.handle);
router.get('/users', ensureAuthenticated, ensureAdmin, listUsersController.handle);