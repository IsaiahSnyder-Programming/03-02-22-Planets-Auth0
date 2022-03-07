import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { GalaxySchema } from '../models/Galaxy';
import { StarsSchema } from '../models/Star';
import { UniversalSchema } from '../models/Universal';
import { ValueSchema } from '../models/Value'

class DbContext {
  Universals = mongoose.model('Universal', UniversalSchema);
  Values = mongoose.model('Value', ValueSchema);
  Galaxys = mongoose.model('Galaxy', GalaxySchema);
  Stars = mongoose.model('Star', StarsSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
