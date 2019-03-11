from rest_framework.test import APITestCase
from rest_framework import status
base_url = "http://0.0.0.0:8000/api/"
import random
def random_dni():
    range_ = range(0,10)
    list_ = random.sample(range_,8)
    return ''.join(str(x) for x in list_)
    
class TaskApiTest(APITestCase):
    fixtures = ['users.json','tasks.json']

    def setup(self,is_refresh=None ):
        self.headers   = {"Content-Type": "application/json"}
        self.username  = "admin@gmail.com"
        self.password  = "qwqw1212"        
        if is_refresh:
            self.test_token()
    
    def test_token(self):
        self.setup()
        url = base_url+"accounts/login/"
        data = {  
            "username":self.username,
            "email": self.username,
            "password":self.password,
        }
        response = self.client.post(url, data, headers=self.headers,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        if response.status_code == status.HTTP_200_OK:
            json_ = response.json()
            self.assertNotEqual(json_, None)
            self.assertNotEqual(json_['token'],None)
            self.token = json_['token']
            for field in json_:
                print("%s: %s"%(field,json_[field]))
            self.client.credentials(HTTP_AUTHORIZATION= "JWT "+self.token)
    def test_listar_tareas(self):
        self.setup(True)
        url = base_url+"task/"
        response = self.client.get(url,  headers=self.headers, format='json')
        self.assertEqual(response.status_code,  status.HTTP_200_OK)
        if response.status_code == status.HTTP_200_OK:
            json_ = response.json()
            self.assertNotEqual(json_, None)
            print(json_)
            for field in json_: print(field)
    def test_crear_tarea(self):
        self.setup(True)
        url = base_url+"task/"
        slug=random_dni()
        data={
            "name": "Tarea_"+slug,
            "description": random_dni(),
            "done": False,
            "end_date": "2019-03-03 03:33:31"
        }
        response = self.client.post(url, data, headers=self.headers, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        if response.status_code == status.HTTP_201_CREATED:
            json_ = response.json()
            self.assertNotEqual(json_, None)
            self.assertNotEqual(json_['id'],None)
            self.assertEqual(json_['name'],data['name'])
            self.assertEqual(json_['description'],data['description'])
            for field in json_:
                print("%s: %s"%(field,json_[field]))