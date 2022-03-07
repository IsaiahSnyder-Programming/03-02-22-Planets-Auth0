import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class UniversalService {
    async getAll(query = {}) {
        const universals = await dbContext.Universals.find(query).populate('galaxy', 'name').populate('star', 'name')
        return universals
    }

    async create(body) {
        const universal = await dbContext.Universals.create(body)
        await universal.populate('galaxy', 'name')
        await universal.populate('star', 'name')
        return universal
    }

    async remove(universalId, userId) {
        const universal = await dbContext.Universals.findById(universalId)
        if(universalId.creatorId.toString() !== userId) {
            throw new Forbidden('*softly* Dont')
        }
        await universal.remove()
        return 'deleted'
    }
}

export const universalService = new UniversalService()