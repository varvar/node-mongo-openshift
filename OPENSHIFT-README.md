### Deploy to openshift via templates:

#run in root folder:

oc new-project nodejs-mongo --display-name="nodejs-mongo" --description="Sample Node.js app with mongo DB"

oc new-app -f templates/nodejs-mongodb2.json

### Deploy to openshift via helm:

#run in /helm folder:

oc new-project myapp

helm install myapp .
