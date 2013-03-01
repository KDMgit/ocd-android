from flask import Flask
from flask import request, Response
from flask.helpers import send_from_directory

import httplib2

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
    
    return Response(status=response.status, headers=response, response=content)



@app.route("/ripple/xhr_proxy", methods=["GET", "POST"])
def ripple_proxy():
    url = request.args['tinyhippos_rurl']
    
    method = request.method
    body = request.data
    
    headers = dict(request.headers.to_list())
    
    response, content = http.request(url, method, body, headers)
    
    return Response(status=response.status, headers=response, response=content)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug="true", port=5000)
    
    
