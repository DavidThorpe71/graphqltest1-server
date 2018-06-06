import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const usersSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  }
});

export default mongoose.model('Users', usersSchema);
