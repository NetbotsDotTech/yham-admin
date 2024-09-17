import chalk from 'chalk';
import ora from 'ora';
import figlet from 'figlet';
import cliProgress from 'cli-progress';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


import { errorHandler } from './src/middlewares/errorHandler.js';
import connectDB from './db.js';
import cookieParser from 'cookie-parser';

import userRoutes from './src/routes/userRoutes.js';
import artifactRoutes from './src/routes/artifactRoutes.js';
import qrRoutes from './src/routes/qrCodes.js';
import timeTableRoutes from './src/routes/timeTableRoutes.js';
import otpRoutes from './src/routes/otpRoutes.js';



dotenv.config();
const app = express();
app.use(cookieParser());
// CORS setup
app.use(cors({
  origin: 'http://localhost:5173/',
  // origin: ['http://localhost:3000','http://localhost:5173/'],

  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: 'Content-Type',
  credentials: true, 
}));

const PORT = process.env.PORT || 5000;

const spinner = ora(chalk.yellow('Connecting to the database...')).start();
connectDB()
  .then(() => {
    spinner.succeed(chalk.green('Database connected successfully'));
  })
  .catch((err) => {
    spinner.fail(chalk.red('Database connection failed'));
    console.error(err);
    process.exit(1); 
  });

app.use(express.json());


app.use('/api/user',userRoutes );
app.use('/api/artifacts', artifactRoutes);
app.use('/api/qr-codes', qrRoutes);
app.use('/api/time-table',timeTableRoutes  );
app.use('/api/otp',  otpRoutes);
app.use(errorHandler);

const progressBar = new cliProgress.SingleBar({
  format: `${chalk.blue('Server setup')} |${chalk.cyan('{bar}')}| {percentage}%`,
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
}, cliProgress.Presets.shades_classic);

progressBar.start(100, 0);

let loadingProgress = 0;
const loadingInterval = setInterval(() => {
  loadingProgress += 20;
  progressBar.update(loadingProgress);
  if (loadingProgress >= 100) {
    clearInterval(loadingInterval);
    progressBar.stop();

    figlet.text('YHAM  Server Ready!', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    }, (err, data) => {
      if (err) {
        console.log(chalk.red('Something went wrong with figlet'));
        console.error(err);
      } else {
        console.log(chalk.green(data));
        console.log(chalk.blue(`Server running on port ${PORT}`));
      }
    });
  }
}, 200); 

app.listen(PORT, () => {
  console.log(chalk.magenta(`Server listening on port ${PORT}`));
});
