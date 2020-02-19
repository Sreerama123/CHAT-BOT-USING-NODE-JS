const dialogflow = require('dialogflow');
const uuid = require('uuid');

/**
* Send a query to the dialogflow agent, and return the query result.
* @param {string} projectId The project to be used
*/

async function runSample(text) {

  projectId = 'chatbot-gnpmet'

  const sessionId = uuid.v4();
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./ChatBot-c02df29f5443.json"
  });

  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {

        text: text,


        languageCode: 'en-US',
      },
    },
  };


  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');

  var arr=new Array();
  const result = responses[0].queryResult;
  console.log(result)

  var i=result.intent.displayName;
  if(i=='Default Welcome Intent')
  {
    console.log(result.fulfillmentText)
    arr[0]='Welcome';
    arr[1]=result.fulfillmentText;
    return arr;
  }

  else if(i=='openings_1' || i=='openings')
  {
    arr[0]='jobs'
    if(result.parameters.fields['count'].stringValue!='')
    {
      arr[8]=result.parameters.fields['count'].stringValue;

    }
    if(result.parameters.fields['geo-city'].stringValue!='')
    {
      arr[1]=result.parameters.fields['geo-city'].stringValue;

    }
    var c=result.parameters.fields.experience.stringValue;
    var c1=result.parameters.fields.experience1.stringValue;
    var n=result.parameters.fields.number

    if(c!='' && c1!='')
    {
      arr[4]=c;
      arr[5]=c1;
      arr[6]=n.listValue.values[0].numberValue;
      arr[7]=n.listValue.values[1].numberValue;
    }
    else if(c!='' || c1!='')
    {

      if(c=='minimum')
      {
        arr[4]=c;
        arr[6]=n.listValue.values[0].numberValue;
      }
      else{
        arr[5]=c;
        arr[7]=n.listValue.values[0].numberValue;
      }
    }
    if(result.parameters.fields.title.stringValue!='')
    {
      arr[3]=result.parameters.fields.title.stringValue;
    }
    if(result.parameters.fields.type.stringValue!='')
    {
      arr[2]=result.parameters.fields.type.stringValue;
    }
  }

  else if(i=='Default Fallback Intent')
  {
    //later
    arr[0]='error'
    console.log(i);
    return arr;
  }
  else
  {
    arr[0]='intent'
    console.log('k')
    var intent=result.intent.displayName;

    intent1=intent.replace(/[^a-zA-Z ]/g, "");
    console.log(intent1)

    console.log(intent1.length);
    var intent12=intent1;
    if(intent1=='feature')
    {
      intent1='features'
    }

    console.log(result.parameters.fields)
    if(intent1=='features' || intent1=='resource' || intent1=='socialmedia')
    {

      arr[1]=intent1;
      console.log(result.parameters.fields[intent1])
      arr[2]=result.parameters.fields[intent1].stringValue;

    }
    else {
      var intent2=intent.replace(/[^a-zA-Z ]/g, "");
      arr[2]=intent2;
    }
  }
  console.log(arr)
  return arr;
  
}

module.exports=
{
  runSample
}
