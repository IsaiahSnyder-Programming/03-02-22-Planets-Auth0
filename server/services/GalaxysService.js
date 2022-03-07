import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { logger } from "../utils/Logger"


class GalaxysService {
    async getAll(query = {}) {
        const galaxys = await dbContext.Galaxys.find(query).populate('galaxy', 'name')
        return galaxys
    }

    async getById(id) {
        const galaxy = await dbContext.Galaxys.findById(id).populate('galaxy', 'name')
        if(!galaxy) {
            throw new BadRequest('Invalid Galaxy Id')
        }
        return galaxy
    }

    async create(body) {
        const galaxys = await dbContext.Galaxys.create(body)
        return galaxys
    }

    async remove(galaxyId, userId) {
        const galaxy = await this.getById(galaxyId)
        if(galaxy.creatorId.toString() !== userId) {
            throw new BadRequest('You Cannot Delete This Galaxy')
        }
        await dbContext.Galaxys.findOneAndRemove({_id: galaxyId})
        return 'Galaxy Deleted'
    }
}

export const galaxysService = new GalaxysService()