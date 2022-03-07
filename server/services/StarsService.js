import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class StarsService {
    async getAll(query = {}) {
        const stars = await dbContext.Stars.find(query).populate('creator', 'name')
        return stars
    }

    async getById(id) {
        const stars = await dbContext.Stars.findById(id).populate('creator', 'name')
        if(!stars) {
            throw new BadRequest('Invalid Star Id')
        }
        return stars
    }

    async create(body) {
        const star = dbContext.Stars.create(body)
        return star
    }

    async remove(starId, userId) {
        const star = await this.getById(starId)
        if(star.creatorId.toString() !== userId) {
            throw new BadRequest('You cannot delete this star')
        }
        await dbContext.Stars.findOneAndRemove({_id: starId})
        return 'Star Deleted'
    }
}

export const starsService = new StarsService()