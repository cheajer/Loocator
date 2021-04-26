import geopy.distance
import requests
import json
from json import loads, dumps
import time
import re

def computeDistance(lat1, lng1, lat2, lng2):
    coord1 = (lat1,lng1)
    coord2 = (lat2,lng2)
    return geopy.distance.distance(coord1, coord2).km

def calcReviewScore(reviews):
    sum=0
    for review in reviews:
        sum = sum + float(review['review_score'])

    if sum == 0:
        return 0
    return sum/len(reviews)


def listNearbyToilets(maxDist, lat, lng):
    f=open('toilets.json', 'r')
    toiletDB = loads(f.read())
    toilets = []
    f.close()
    for toilet in toiletDB["api"]:
        x = toilet["latitude"]
        y = toilet["longitude"]
        dist = computeDistance(lat, lng, toilet["latitude"], toilet["longitude"])
        if  dist < maxDist:
            id = toilet["id"]
            latitude = toilet["latitude"]
            longitude = toilet["longitude"]
            name = toilet["name"]
            unisex = toilet["unisex"]
            payment = toilet["payment"]
            changeroom = toilet["changeroom"]
            inclusive = toilet["inclusive"]
            ambulant = toilet["ambulant"]
            accessible = toilet["accessible"]
            address = toilet["address"]
            state = toilet["state"]
            parking = toilet["parking"]
            babychange = toilet["babychange"]
            openinghours = toilet["openinghours"]
            shower = toilet["shower"]
            note = toilet["additional"]
            review_score = calcReviewScore(toilet["reviews"])
            data = {
                "id": id,
                "latitude": latitude,
                "longitude":longitude,
                "name": name,
                "unisex": unisex,
                "payment": payment,
                "changeroom": changeroom,
                "inclusive": inclusive,
                "ambulant": ambulant,
                "accessible": accessible,
                "address": address,
                "state": state,
                "parking": parking,
                "babychange": babychange,
                "openinghours": openinghours,
                "shower": shower,
                "additional": note,
                "review_score": review_score,
                "dist": round(dist,1)
            }
            toilets.append(data)
            toilet['appeared']=toilet['appeared']+1
    for toilet in toiletDB["establishments"]:
        x = toilet["latitude"]
        y = toilet["longitude"]
        dist = computeDistance(lat, lng, toilet["latitude"], toilet["longitude"])
        if  dist < maxDist:
            id = toilet["id"]
            latitude = toilet["latitude"]
            longitude = toilet["longitude"]
            name = toilet["name"]
            unisex = toilet["unisex"]
            payment = toilet["payment"]
            changeroom = toilet["changeroom"]
            inclusive = toilet["inclusive"]
            ambulant = toilet["ambulant"]
            accessible = toilet["accessible"]
            address = toilet["address"]
            state = toilet["state"]
            parking = toilet["parking"]
            babychange = toilet["babychange"]
            openinghours = toilet["openinghours"]
            shower = toilet["shower"]
            note = toilet["additional"]
            review_score = calcReviewScore(toilet["reviews"])
            data = {
                "id": id,
                "latitude": latitude,
                "longitude":longitude,
                "name": name,
                "unisex": unisex,
                "payment": payment,
                "changeroom": changeroom,
                "inclusive": inclusive,
                "ambulant": ambulant,
                "accessible": accessible,
                "address": address,
                "state": state,
                "parking": parking,
                "babychange": babychange,
                "openinghours": openinghours,
                "shower": shower,
                "additional": note,
                "review_score": review_score,
                "dist": round(dist,1)
            }
            toilets.append(data)
            toilet['appeared']=toilet['appeared']+1

        f = open('toilets.json', 'w')
        f.write(dumps(toiletDB))
        f.close()
    return toilets

def loginCheck(email, password, userType):
    file = open('credentials.json', 'r')
    jsonCreds = json.load(file)
    file.close()
    flag = 0
    # print the keys and values
    for creds in jsonCreds[userType]:
        if (creds["email"] == email):
            if (creds["password"] == password):
                if (userType=="users") :
                    return creds["id"], 1, creds["username"]
                else:
                    return creds["id"], 1, creds["username"]

    return flag, -1

def getReviewsGivenID(id):
    f = open("toilets.json", "r")
    toilets = loads(f.read())
    for toilet in toilets["establishments"]:
        if toilet["id"] == id:
            f.close()
            return toilet["reviews"], toilet["review_count"]
    for toilet in toilets["api"]:
        if toilet["id"] == id:
            f.close()
            return toilet["reviews"], toilet["review_count"]
    f.close()
    return [], 0

def getToiletGivenID(id):
    f = open('toilets.json', 'r')
    toilets = loads(f.read())
    f.close()
    for toilet in toilets["api"]:
        if id == toilet["id"]:
            print("test")
            toilet["views"]=toilet["views"]+1
            f = open('toilets.json', 'w')
            f.write(dumps(toilets))
            f.close()
            return toilet
    for toilet in toilets["establishments"]:
        if id == toilet["id"]:
            toilet["views"]=toilet["views"]+1
            f = open('toilets.json', 'w')
            f.write(dumps(toilets))
            f.close()
            return toilet


    return None


def getToiletPageInfo(lat, lng, id):
    reviews, review_count = getReviewsGivenID(int(id))

    toilet_data = getToiletGivenID(int(id))
    latitude = toilet_data["latitude"]
    longitude = toilet_data["longitude"]
    name = toilet_data["name"]
    unisex = toilet_data["unisex"]
    payment = toilet_data["payment"]
    changeroom = toilet_data["changeroom"]
    inclusive = toilet_data["inclusive"]
    ambulant = toilet_data["ambulant"]
    accessible = toilet_data["accessible"]
    address = toilet_data["address"]
    state = toilet_data["state"]
    town = toilet_data["town"]
    parking = toilet_data["parking"]
    babychange = toilet_data["babychange"]
    openinghours = toilet_data["openinghours"]
    shower = toilet_data["shower"]
    note = toilet_data["additional"]
    distance = round(computeDistance(lat, lng, latitude, longitude), 1)
    
    
    return {
        "name": name,
        "lat": latitude,
        "lng": longitude,
        "unisex": unisex,
        "payment": payment,
        "changeroom": changeroom,
        "inclusive": inclusive,
        "ambulant": ambulant,
        "accessible": accessible,
        "parking": parking,
        "babychange": babychange,
        "openinghours": openinghours,
        "note": note,
        "shower": shower,
        "distance": distance,
        "address": address+" "+town+", "+state,
        "reviews": reviews,
        "review_count": review_count
    }

def registerUser(username, email, password, firstname, lastname, userType):
    f = open('credentials.json', 'r')
    credentials = loads(f.read())
    regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
    for user in credentials[userType]:
        if user["email"] == email:
            return "Email Already Exists."
        if user["username"] == username:
            return "Username Already Exists."
        if len(password) < 8:
            return "Password too short (must be at least 8 characters long)."
        if not re.search(regex, email):
            return "Email is invalid."
    f.close
    f= open("credentials.json", "w")
    if userType == "users":
        credentials[userType].append({
            "username": username,
            "password": password,
            "email": email,
            "fname": firstname,
            "lname": lastname,
            "id": len(credentials["users"])
        })
    else:
        credentials[userType].append({
            "username": username,
            "password": password,
            "email": email,
            "fname": firstname,
            "lname": lastname,
            "id": len(credentials["establishments"]),
            "toilets": []

        })

    f.write(json.dumps(credentials))
    f.close()
    return "Register Success. You may now log in."

def getReviewsAppearedViews(id, toilets):
    for toilet in toilets:
        if toilet['id'] == id:
            return toilet['reviews'], toilet['appeared'], toilet['views']

def initToiletDB():
    url = 'https://data.gov.au/data/api/3/action/datastore_search?resource_id=34076296-6692-4e30-b627-67b7c4eb1027&limit=20000'
    response = requests.get(url)
    response = response.json()

    f = open('toilets.json', 'r')
    toilets = loads(f.read())
    f.close()

    api = toilets["api"]
    toilets["api"] = []

    for toilet in response["result"]["records"]:
        id = toilet["FacilityID"]
        latitude = toilet["Latitude"]
        longitude = toilet["Longitude"]
        name = toilet["Name"]
        unisex = toilet["Unisex"]
        payment = toilet["PaymentRequired"]
        changeroom = toilet["AdultChange"]
        inclusive = toilet["Inclusive"]
        ambulant = toilet["Ambulant"]
        accessible = toilet["Accessible"]
        address = toilet["Address1"]
        town = toilet["Town"]
        state = toilet["State"]
        parking = toilet["Parking"]
        babychange = toilet["BabyChange"]
        openinghours = toilet["OpeningHours"]
        shower = toilet["Shower"]
        note = toilet["OpeningHoursNote"]
        reviews, appeared, views = getReviewsAppearedViews(id, api)
        data = convertStringtoJSON(id, latitude, longitude, name, unisex, payment, changeroom, inclusive, ambulant, accessible, address, town, state, parking, babychange, openinghours, shower, note, reviews, appeared, views)
        toilets["api"].append(data)
    toilets=dumps(toilets)
    f = open('toilets.json', 'w')
    f.write(toilets)
    f.close()

def convertStringtoJSON(id, latitude, longitude, name, unisex, payment, changeroom, inclusive, ambulant, accessible, address, town, state, parking, babychange, openinghours, shower, note, reviews, appeared, views):
    return  {
        "id": id,
        "owner": 0,
        "latitude": latitude,
        "longitude":longitude,
        "name": name,
        "unisex": unisex,
        "payment": payment,
        "changeroom": changeroom,
        "inclusive": inclusive,
        "ambulant": ambulant,
        "accessible": accessible,
        "address": address,
        "town": town,
        "state": state,
        "parking": parking,
        "babychange": babychange,
        "openinghours": openinghours,
        "shower": shower,
        "additional": note,
        "reviews": reviews,
        "review_count": len(reviews),
        "appeared": int(appeared),
        "views": int(views),
        }

#ADDED#
def appendReviews(review):
    f = open('toilets.json', 'r')
    toilets = loads(f.read())
    f.close()
    data = {
        "id": 0,
        "uid": review["uid"],
        "review_score":review["review_score"],
        "title": review["title"],
        "body": review["body"]
    }
    
    for toilet in toilets["api"]:
        # print(toilet["id"])
        # print(review["tid"])
        if int(review["tid"]) == toilet["id"]:
            data["id"] = toilet["review_count"]
            toilet["review_count"]+=1
            toilet["reviews"].append(data)
            print(toilet["reviews"])

           
    for toilet in toilets["establishments"]:
        if int(review["tid"]) == int(toilet["id"]):
            data["id"] = toilet["review_count"]
            toilet["review_count"]+=1
            toilet["reviews"].append(data)
 
    toilets=dumps(toilets)
    # print(toilets)
    f = open('toilets.json', 'w')
    f.write(toilets)
    f.close()

def registerToilet(name, owner, address, state, town,openinghours, additional, ambulant, accessible, babychange, changeroom, inclusive, parking, payment, shower, unisex, latitude, longitude):
    f = open('toilets.json', 'r')
    toilets = loads(f.read())
    f.close()

 
    newToilet = {
            "id": len(toilets["establishments"])+100000,
            "owner": owner,
            "latitude": latitude,
            "longitude": longitude,
            "name": name,
            "unisex": unisex,
            "payment": payment,
            "changeroom": changeroom,
            "inclusive": inclusive,
            "ambulant": ambulant,
            "accessible": accessible,
            "address": address,
            "state": state,
            "town": town,
            "parking": parking,
            "babychange": babychange,
            "openinghours": openinghours,
            "shower": shower,
            "additional": additional,
            "reviews": [],
            "review_count": 0,
            "appeared":0,
            "views":0
            }
    
    toilets["establishments"].append(newToilet)
    toilets=dumps(toilets)
    f = open('toilets.json', 'w')
    f.write(toilets)
    f.close()

def getOwnedToiletsInfoByID(id):
    f = open('toilets.json','r')
    toilet_data = loads(f.read())
    f.close()
    appearedSum = 0
    viewSum = 0
    toilets=[]

    for toilet in toilet_data["api"]:
        if id == toilet['owner']:
            viewSum=viewSum+toilet['views']
            appearedSum=appearedSum+toilet['appeared']
            name=toilet['name']
            appeared=toilet['appeared']
            views=toilet['views']
            location=toilet['town']+', '+toilet['state']
            rating=calcReviewScore(toilet['reviews'])
            reviews=toilet['reviews']
            tid=toilet['id']
            data={
                "name":name.lower().strip(),
                "id":tid,
                "location":location,
                "views":views,
                "appeared":appeared,
                "rating":rating,
                "reviews":reviews
            }
            toilets.append(data)
    for toilet in toilet_data["establishments"]:
        if id == int(toilet['owner']):
            viewSum=viewSum+toilet['views']
            appearedSum=appearedSum+toilet['appeared']
            name=toilet['name']
            appeared=toilet['appeared']
            views=toilet['views']
            location=toilet['town']+', '+toilet['state']
            rating=calcReviewScore(toilet['reviews'])
            reviews=toilet['reviews']
            data={
                "name":name,
                "location":location,
                "views":views,
                "appeared":appeared,
                "rating":rating,
                "reviews":reviews
            }
            toilets.append(data)
    return toilets, appearedSum, viewSum
    
