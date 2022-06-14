import MongoStore from 'connect-mongo'
import 'dotenv/config'
const ttlSeconds = 60


export const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_ATLAS_SRV || 'mongodb://localhost:27017/gran-mate-gourmet',
    crypto: {
      secret: 'monkey',
    },
  }),
  secret: 'secretCode',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};