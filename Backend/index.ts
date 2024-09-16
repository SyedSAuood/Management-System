import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

import LoginRoutes from './routes/LoginRoutes';
import ConnectToDB from './Database/DatabaseConnection';

app.use('/signin', LoginRoutes);








app.listen(port, () => {
  ConnectToDB();
  console.log(`Server is running on http://localhost:${port}`);
});