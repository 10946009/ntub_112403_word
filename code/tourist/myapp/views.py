from django.shortcuts import render
from datetime import datetime

import googlemaps
import os
import populartimes
from os.path import join, dirname
from dotenv import load_dotenv, find_dotenv
import requests
#在這定義函數

# def sayhello(request,username):
#     now = datetime.now

#     return render(request,"sayhello.html",locals())

def sayhello(request):
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path, override=True)  # 設定 override 才會更新變數哦！
    GOOGLE_PLACES_API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY")
    print(GOOGLE_PLACES_API_KEY)

    # Client
    gmaps = googlemaps.Client(key=GOOGLE_PLACES_API_KEY)
    # geocode_result = gmaps.geocode("臺北市立動物園")
    p =populartimes.get_id(GOOGLE_PLACES_API_KEY, 'ChIJj4EySmCqQjQRZte0Cf0G_qo')
    rating = p['rating']
    rating_n=p['rating_n']
    time_spent=p['time_spent']
    print(p)
    print(time_spent)
    return render(request,"sayhello.html",locals())


def get_all_taiwan(request):
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path, override=True)  # 設定 override 才會更新變數哦！
    GOOGLE_PLACES_API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY")


    URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'

    #之後要用迴圈把資料抓起來(範例:"新北市中和區景平路"+"景點")
    r = requests.get(URL + 'query=' + "台北景點" +
                    '&key=' + GOOGLE_PLACES_API_KEY)

    data = r.json()
    test_list = []
    for result in data['results']:
        test_list.append([result['name'],result['formatted_address']]) 
        print(test_list)
        print(result['name'], result)
        if len(test_list) == 10:
            break

    return render(request,"get_all_taiwan.html",locals())