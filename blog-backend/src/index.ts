// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./env');

import app from './app';
import mongoose from 'mongoose';

const { PORT, MONGO_URI } = process.env;

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((e: Error) => {
      console.error(e);
    });
}

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
