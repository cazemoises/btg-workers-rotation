var AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var params = {
 MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
 // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
 // MessageGroupId: "Group1",  // Required for FIFO queues
 QueueUrl: "http://localhost:4566/000000000000/soulindo"
};



exports.sendMessage = async (req, res) => {
  //Como manda??? kkkk
  let ret
  params.MessageBody = JSON.stringify(req.body)
  sqs.sendMessage(params, function(err, data) {
    if (err) {
      ret = "Error"
      console.error(err)
    } else {
      ret = "Success";
      console.log("ok? " + data)
      res.status(200).send({
        message: 'Message sent successfully!',
        body: {
          message : data
        }
          
        ,
      })
    }
  });

 
}