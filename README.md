# Academinet
A research discovery platform for students and researches. Academinet provides a platform for students to discover research opportunities posted by researchers at their school. Acadminet also provides researchers with a platform to post their reearch opportunites. By combining the ease of discovery that job boards allow, Academinet aims to simplify the process of researchers and students finding each other. 
## Prerequisites 
` Node.js v20 or greater  ` 
## Setup, Building, and Running
First make your working directory and clone this repository to your local machine. \
`mkdir academinet`\
`git clone https://github.com/mattias-castilla/CEN3031-group-project.git academinet `

Navigate to the directory. \
`cd academinet`

Set environment variables inside the backend directory. The .env file must have the database password and JWT secret set. The JWT can be set to anyting. \
` cd backend ` \
` touch .env `\
` DB_PASSWORD=token here `\
` JWT_TOKEN=secret here ` 

Navigate back to the academinet directory. \
` cd .. `

Install the dependencies. \
`npm run install`

Build the frontend. \
`npm run build-frontend`

Start the backend \
`npm run start-backend`

After this you can navigate to your browser to access academinet hosted locally on your machine. Academinet should be hosted at http://127.0.0.1:5000 .

