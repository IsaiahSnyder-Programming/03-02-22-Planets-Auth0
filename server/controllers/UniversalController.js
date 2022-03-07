import { Auth0Provider } from "@bcwdev/auth0provider";
import { universalService } from "../services/UniversalService";
import BaseController from "../utils/BaseController";


export class UniversalController extends BaseController {
    constructor() {
        super('api/universal')
        this.router
            .get('', this.getAll)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.remove)
    }

    async getAll(req, res, next) {
        try {
            const universals = await universalService.getAll(req.query)
            return res.send(universals)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const universal = await universalService.create(req.body)
            return res.send(universal)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const universal = await universalService.remove(req.params.id, req.userInfo.id)
            return res.send(universal)
        } catch (error) {
            next(error)
        }
    }
}