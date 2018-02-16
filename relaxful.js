var url = require('url');

module.exports.request = function(method, urlString, obj) {
    var apiReq;

    var promise = new Promise(function(resolve, reject) {
        if(!urlString) {
            reject(new Error('URL Cannot Be Null'));
        } else{
            if(!method) {
                reject(new Error('Method cannot be null'));
            } else {
                var http = require('http');
                var data = "";

                var tUrl = url.parse(urlString);

                var options = {
                    hostname: tUrl.hostname,
                    path: tUrl.pathname,
                    method: method,
                    port: tUrl.port
                }; 

                if(tUrl.search) {
                    options.path += tUrl.search;
                }

                if(obj && obj.headers) {
                    options.headers = obj.headers; 
                } 

                if(tUrl.protocol == 'https:') { 
                    http = require('https'); 
                }

                apiReq = http.request(options, result => {
                    result.setEncoding('utf-8');
                             
                    result.on('data', chunk => { 
                        data += chunk; 
                    });

                    result.on('end', function() { 
                        var resp = {
                            status:result.statusCode,
                            message:result.statusMessage,
                            headers:result.headers,
                            text:data,
                            json() {
                                return new Promise(function(resolve,reject) {
                                    try {
                                        result = JSON.parse(data);
                                        resolve(result);
                                    } catch(error) {
                                        reject(new Error('Invalid JSON')); 
                                    }
                                });
                            },
                            validate() {
                                return new Promise(function(resolve,reject) {
                                    if(resp.status >= 200 && resp.status <= 304 || resp.status == 409) {
                                        resolve(resp);
                                    }
                                    reject(new Error(resp.status+' Error'));
                                });                            
                            }
                        };

                        resolve(resp);
                    });
                });
                    
                apiReq.on('error', error => { 
                    reject(error); 
                });
                        
                if(obj && obj.body) {
                    apiReq.write(obj.body);
                }
                        
                apiReq.end();
            }
        }      
    });

    return { req: apiReq, promise: promise };  
};
