import time
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from json import dumps
from helpers import *

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# @app.before_first_request
# def startup():
#     initToiletDB()

@app.route('/user/dashboard', methods=["POST"])
def Dashboard():
    coordinates = request.get_json()
    return {'coords': coordinates}

@app.route('/user/toilets', methods=["GET", "POST"])
def Toilets():
    latitude = request.args.get("lat")
    longitude = request.args.get("lng")
    distance = request.args.get("dist")

    toilet_list = jsonify(listNearbyToilets(int(distance), latitude, longitude))
    return toilet_list

@app.route('/user/toilet/info', methods=["GET", "PUT"])
def ToiletPageInfo():
    if request.method == "GET":
        latitude = request.args.get("lat")
        longitude = request.args.get("lng")
        t_id = request.args.get("id")
        return jsonify(getToiletPageInfo(latitude, longitude, t_id))
    elif request.method == "PUT":
        data = request.get_json()
        uid = data["uid"]
        tid = data["tid"]
        title = data["title"]
        body = data["body"]
        review_score = data["review_score"]
        appendReviews({
            "uid":uid,
            "tid":tid,
            "title":title,
            "body":body,
            "review_score":review_score
        })
        return jsonify({})

@app.route('/user/register', methods=["POST"])
def UserRegister():
    details=request.get_json()
    email = details["email"]
    password = details["password"]
    firstname = details["fname"]
    lastname = details["lname"]
    username = details["username"]
    response = registerUser(username, email, password, firstname, lastname, "users")
    return {'response': response}

@app.route('/user/login', methods=["POST"])
def UserLogin():
    auth = request.get_json()
    id, flag, username = loginCheck(auth['email'], auth['password'], "users")
    if (flag == 1):
        return {'flag': "1", 'id': id, "username": username}
    else:
        return {'flag': "0"}

# @app.route('/user/review', methods=["POST"])
# def MakeReview():


@app.route('/est/register', methods=["POST"])
def EstRegister():
    details=request.get_json()
    email = details["email"]
    password = details["password"]
    firstname = details["fname"]
    lastname = details["lname"]
    username = details["username"]
    response = registerUser(username, email, password, firstname, lastname, "establishments")
    return {'response': response}



@app.route('/est/registertoilet', methods=["POST"])
def EstRegisterToilet():
    details=request.get_json()
    name = details["name"]
    address = details["address"]
    owner = details["owner"]
    openinghours = details["openinghours"]
    additional = details["additional"]
    ambulant = details["ambulant"]
    accessible = details["accessible"]
    babychange = details["babychange"]
    changeroom = details["changeroom"]
    inclusive = details["inclusive"]
    parking = details["parking"]
    payment = details["payment"]
    shower = details["shower"]
    town = details["town"]
    state = details["state"]
    unisex = details["unisex"]
    lat = details["latitude"]
    lng = details["longitude"]
    registerToilet(name, owner, address, state, town,openinghours, additional, ambulant, accessible, babychange, changeroom, inclusive, parking, payment, shower, unisex, lat, lng)
    return {'response': "success"}

@app.route('/est/login', methods=["POST"])
def EstLogin():
    auth = request.get_json()
    id, flag, username = loginCheck(auth['email'], auth['password'], "establishments")
    if (flag == 1):
        return {'flag': "1", 'id': id, 'username': username}
    else:
        return {'flag': "0"}

@app.route('/est/dashboard', methods=["GET"])
def EstDashboard():
    flag = request.args.get('flag')
    id = request.args.get('id')
    if flag == "1":
        toilets, appearedSum, viewSum = getOwnedToiletsInfoByID(int(id))
        return {
            "toilets":toilets,
            "totalAppeared": appearedSum,
            "totalViews": viewSum
        }
    else:
        return "Please log in."



if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)