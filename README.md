# Back End Documentations #

### How to Use the Endpoint ###

* Make a call in the Front End to this URL
    * https://mmsg-project.herokuapp.com/conversion/:base_currency/:target_currency/:amount

* Front End will need to pass in the base currency, target currency, and amount to be converted in the request. 
   
* The parser takes the XML data from one endpoint, parses it into JSON, and then calculates the conversion rates and passes that back in the response
    
* The response is sent back in a GET request.  

- - - -

It's important to note, that these conversions are run off of European rates of conversion. 

- - - -
#### Built With ####
* cors
* dotenv
* express
* helmet
* node-fetch
* nodemon
* xml-js

- - - -

## Links of Note ##
Deployed link is found [Here](https://mmsg-project.herokuapp.com).
Front End App is found [Here](https://mmsg-fe-mj5zrwshs.now.sh)

Copy of the Front End Repo: https://github.com/a-soren/MMSG-FE


Created by: Amberly Sorensen for MMSG
