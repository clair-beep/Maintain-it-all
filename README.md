Installation

npm init 
npm install express
npm install mongoose
npm install connect-mongo
npm install express-session
npm install express-handlebars
npm install dotenv 
npm install passport
npm install passport-google-oauth20
npm install luxon

Connecting the  database

Used Mongo Db for this. You will need to set up <DB_STRING> as an env variable with with the key from your DB cluster 

The connection string should look something like this:
'mongodb+srv://<username>:<password>@<clustername>-rmp3c.mongodb.net/test?retryWrites=true&w=majority'

notes:
 <username> should be the one you've assigned to your cluster.
Replace <password> with the Database user’s password

passport-google-oauth20
The Google authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. The client ID and secret obtained when creating an application are supplied as options when creating the strategy. 

You will need to  define 2 aditional env variables:
GOOGLE_CLIENT_ID = <id>
GOOGLE_CLIENT_SECRET = <client-secret>

Add  these two variables to your environment.


Contributing
The main purpose of this repository is to continue evolving the core of this into a more user friendly wepsite, making it faster and easier to use. Development of happens in the open on GitHub.
