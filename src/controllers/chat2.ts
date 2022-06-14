import * as util from 'util';
import { normalize, schema } from 'normalizr';
import { MessageModel,IMessage } from '../models/schemas/chat';


export const addMessage = async (msg:IMessage) => {
  let savedMessage = await MessageModel.create(msg);
  return savedMessage;
};

const author = new schema.Entity('author', {}, { idAttribute: 'email' });

const msge = new schema.Entity(
  'message',
  {
    author: author,
  },
  { idAttribute: '_id' }
);

const msgesSchema = new schema.Array(msge);


export const getAllMessages = async () => {
  try {
    //El lean le dice a mongoose que solo queremos un simple objeto como respuesta
		const messagesOriginalData = await MessageModel.find().lean();

    let normalizedMessages = normalize(messagesOriginalData, msgesSchema);
    
    return normalizedMessages;
  } catch (err) {
    console.log('ERROR');
    console.log(err);
  }
};

export const getAuthorById =async (id:string) => {
  try{
    const author = await MessageModel.findById(id)
    return author
  }
  catch(err){
    console.log(err)
  }
}