import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { requireAuth, generateJWT } from './auth';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  const isImageUrl = require('is-image-url');
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1


  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.get('/filteredimage',
  requireAuth,
  async (req, res) => {
    const image_url = req.query.image_url;
    let getImagePath = '';

    if (isImageUrl(image_url)){
      
      getImagePath = await filterImageFromURL(image_url);

    } else {
      // console.log('Not valid!')
      res.status(400).send('image is required!');
    }

    res.sendFile(getImagePath, async () => {
      deleteLocalFiles([getImagePath]);
    }, (err) => {
      res.status(500).send('Error writing the file!');
    })
  });

  app.post('/login',
  async ( req, res ) => {

    //Mock User
    const username: string = 'udagr@m';
    const getjwttoken = generateJWT(username);

    res.status(200).send({ auth: true, token: getjwttoken });
  });


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();