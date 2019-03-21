# serverless

### MongoDB 활용한 CRUD Lambda API Function 만들기

```zsh
$ npm install -g serverless

$ serverless config credentials --provider aws --key xxxxxxxxxxxxxx --secret xxxxxxxxxxxxxx

$ serverless create --template aws-nodejs --path server-crud

```
```yml
# serverless.yml 
service: my-service
provider:
  name: aws
  runtime: nodejs8.10
functions:
  createStory:
    handler: src/stories.createStory
    events:
      - http:
          path: stories
          method: post
  readStories:
    handler: src/stories.readStories
    events:
      - http:
          path: stories
          method: get
  readStory:
    handler: src/stories.readStory
    events:
      - http:
          path: stories/{id}
          method: get
  updateStory:
    handler: src/stories.updateStory
    events:
      - http:
          path: stories/{id}
          method: put
  deleteStory:
    handler: src/stories.deleteStory
    events:
      - http:
          path: stories/{id}
          method: delete
```

```javascript
// /src/models/Stroy.js
const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: String,
  body: String
});

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;
```

```javascript
// /src/stries
const mongoose = require('mongoose');
const Story = require('./models/Story');

const connect = () => {
  return mongoose.connect('mongodb://MONGODB_URL:PORT/serverless');
};

const createResponse = (status, body) => ({
  statusCode: status,
  body: JSON.stringify(body)
});


// 스토리 만들기
exports.createStory = async (event) => {
  const { title, body } = JSON.parse(event.body);
  try{
    await connect()
    const story = await new Story({ title, body });
    await story.save();
    return createResponse(200, story)
  } catch (err) {
    return createResponse(500, null)
  }
};


// 여러개의 스토리 리스팅
exports.readStories = async (event) => {
  try{
    await connect()
    const stories = await Story.find().sort({ _id: -1 }).limit(20).lean().exec()
    return createResponse(200, stories)
  } catch (err) {
    return createResponse(500, null)
  }
};

// 특정 스토리 읽기
exports.readStory = async (event) => {
  try{
    await connect()
    const story = await Story.findById(event.pathParameters.id).exec()
      if (!story) {
        return createResponse(404, null);
      }
    return createResponse(200, story)
  } catch (err) {
    return createResponse(500, null)
  }
};

// 스토리 수정
exports.updateStory = async (event) => {
  try{
    const update = JSON.parse(event.body);
    await connect()
    const story = await Story.findOneAndUpdate({ _id: event.pathParameters.id }, update, { new: true }).exec()
    if (!story) {
      return createResponse(404, null);
    }
    return createResponse(200, null)
  } catch (err) {
    return createResponse(500, null)
  }
};

// 스토리 삭제
exports.deleteStory = async (event) => {
  try{
    await connect()
    const story = await Story.remove({ _id: event.pathParameters.id }).exec()
    if (!story) {
      return createResponse(404, null);
    }
    return createResponse(204, null)
  } catch (err) {
    return createResponse(500, null)
  }
};
```

```zsh
# 배포
$ serverless deploy -v

# 커맨드라인으로 테스트
$ serverless invoke -f readStory -l
```



