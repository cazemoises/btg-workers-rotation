var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
var params = {
  MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageGroupId: "Group1",  // Required for FIFO queues
  QueueUrl: "http://localhost:4566/000000000000/soulindo"
};

exports.sendMessage = async (req, res) => {
  let ret
  params.MessageBody = JSON.stringify(req.body)
  sqs.sendMessage(params, function (err, data) {
    if (err) {
      ret = "Error"
      console.error(err)
    } else {
      ret = "Success";
      obj = JSON.stringify(data)
      console.log(obj)
      res.status(200).send({
        message: 'Message sent successfully!',
        body: {
          message: data
        },
      })
    }
  });
}

exports.readMessage = async (req, res) => {
  const queueURL = "http://localhost:4566/000000000000/soulindo";

  var params = {
    AttributeNames: [
      "SentTimestamp"
    ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
      "All"
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 1,
    WaitTimeSeconds: 0
  };

  console.log("b")
  sqs.receiveMessage(params, function (err, data) {
    var teste = data
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {
      for (let i = 0; i < data.Messages.length; i++) {
        console.log(data.Messages[i].ReceiptHandle)
        var deleteParams = {
          QueueUrl: queueURL,
          ReceiptHandle: data.Messages[i].ReceiptHandle
        }
        sqs.deleteMessage(deleteParams, function (err, data) {
          if (err) {
            console.log("Delete Error", err);
          } else {
            console.log('funciona')
            console.log("Message Deleted", data);
          }
        });
 
      };
    }
  })
  console.log("c")
  res.status(200).send()
  console.log("a")
}