const {schema, denormalize} = normalizr;
// import {schema,denormalize} from 'normalizr'
const author = new schema.Entity('author', {}, { idAttribute: 'email' });

const msge = new schema.Entity(
  'message',
  {
    author: author,
  },
  { idAttribute: '_id' }
);

export const finalSchema = new schema.Array(msge);


export default function denormalizeData (data) {
	const denormalizedData = denormalize(data.result, finalSchema, data.entities);

	return denormalizedData;
}