# Relaxful Node-js

A REST API client.  Currently no file upload support.

## Use

Note the path to the APIHelper.js module, if not installed through npm or a package manager use the absolute path the the file.

### Simple Request

Access string result using 'result.text' property of the result object if request is successfule

```js
var helper = require('./relaxful');

helper.request('get', false, 'url', 80, '/some/path').promise.then(result => {
  console.log(result.text);
}).catch(error => {
  // todo handle error
});
```

### JSON

Use the 'json()' method of a result to parse JSON data from the reqponse.

```js
var helper = require('./relaxful');

helper.request('get', false, 'url', 80, '/some/path').promise.then(result => {
  return result.json();
}).then(json => {
  // todo handle json object  
}).catch(error => {
  // todo handle error
});
```

### Validation

Use the 'validate()' method of a result to validate its' status code.

```js
var helper = require('./relaxful');

helper.request('get', false, 'url', 80, '/some/path').promise.then(result => {
  return result.validate();
}).then(result => {
  console.log(result.text); 
}).catch(error => {
  // todo handle error
});
```

### Cancel a Request

The current request is stored in the 'req' property of the helper object.  
Get the current helper object and access the request property and abort.

```js
helper.req.abort();
```
