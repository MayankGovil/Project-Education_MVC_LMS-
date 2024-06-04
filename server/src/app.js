require('../db/config');

const express = require('express');

const allRoutes = express.Router();

const courserouter = require('../src/routers/courserouter');

const loginrouter = require('../src/routers/Loginrouter');

const sliderrouter = require('../src/routers/Sliderrouter')

const teamrouter = require('../src/routers/Teamrouter');

const videorouter = require('../src/routers/Videorouter');
const userRoutes = require('./routers/UserRouter');
const paymentRouter = require('./routers/PaymentRouter');


allRoutes.use('/Courseapi',courserouter);
allRoutes.use('/',loginrouter);
allRoutes.use('/Sliderapi',sliderrouter);
allRoutes.use('/Teamapi',teamrouter)
allRoutes.use('/Videosapi', videorouter);
allRoutes.use('/user', userRoutes);
allRoutes.use('/payment', paymentRouter);

module.exports = allRoutes;
