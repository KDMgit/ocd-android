from flask import Flask
from flask import request, Response, make_response
from flask.helpers import send_from_directory

import httplib2
import urllib
import requests

import ipdb

http = httplib2.Http()

app = Flask(__name__, static_folder='www')

@app.route("/Proxy/", methods=["GET", "POST"])
def proxy():
    url = request.query_string
    
    method = request.method
    body = request.data
    
    headers = dict(request.headers.to_list())
    headers["Authorization"] = "Basic YWRtaW46bmJkLjIwMDE="
    
    response, content = http.request(url, method, body, headers)
    
    return make_response((content, response.status, response))



@app.route("/ripple/xhr_proxy", methods=["GET", "POST"])
def ripple_proxy():
    
    url = request.args['tinyhippos_rurl']
    method = request.method
    body = urllib.urlencode(request.form)
    headers = dict(request.headers.to_list())
    
    header, content = http.request(url, method=method, body=body, headers=headers)
    header.pop('location',None)
    
    r = make_response((content, header.status, header))
    if r.status_code == 413:
        r.status_code = 200
    
    return r

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug="true", port=5000)
    
    
