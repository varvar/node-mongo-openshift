### Deploy to openshift:

oc new-project nodejs-mongo --display-name="nodejs-mongo" --description="Sample Node.js app with mongo DB"
oc new-app -f templates/nodejs-mongodb2.json