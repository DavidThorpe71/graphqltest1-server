import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const resolutionsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('Resolutions', resolutionsSchema);
