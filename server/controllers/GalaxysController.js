import { Auth0Provider } from '@bcwdev/auth0provider';
import { galaxysService } from '../services/GalaxysService';
import BaseController from "../utils/BaseController";


export class GalaxysController extends BaseController {
    constructor() {
        super('api/galaxys')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/stars', this.getGalaxyStars)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.remove)
    }

    async getAll(req, res, next) {
        try {
            const galaxys = await galaxysService.getAll(req.query)
            return res.send(galaxys)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const galaxys = await galaxysService.getById(req.params.id)
            return res.send(galaxys)
        } catch (error) {
            next(error)
        }
    }

    async getGalaxyStars(req, res, next) {
        
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const galaxys = await galaxysService.create(req.body)
            return res.send(galaxys)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const galaxy = await galaxysService.remove(req.params.id, req.userInfo.id)
            return res.send(galaxy)
        } catch (error) {
            next(error)
        }
    }
}