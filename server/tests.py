import unittest
import requests


class FlaskTestCase(unittest.TestCase):
    URL = "http://localhost:5000/api/users"
    message_URL = "http://localhost:5000/api/messages"
    token_URL = "http://localhost:5000/api/token"

    data = {"username": "theTest", "password": "testing"}
    message = {
        "userId": 1,
        "text": "Unit Testing",
        "topic": "General",
    }

    user = {"username": "theTest", "password": "testing"}

    def test_1_get_all_users(self):
        resp = requests.get(self.URL)
        self.assertEqual(resp.status_code, 200)
        print("Test 1 Completed.")

    def test_2_post_user(self):
        resp = requests.post(self.URL, json=self.data)
        self.assertEqual(resp.status_code, 200)
        print("Test 2 Completed. User posted")

    def test_3_post_message(self):
        resp = requests.post(self.message_URL, json=self.message)
        self.assertEqual(resp.status_code, 200)
        print("Test 3 Completed. Message posted")

    def test_4_post_token(self):
        resp = requests.post(self.token_URL, json=self.user)
        self.assertEqual(resp.status_code, 200)
        print("Test 4 Completed. Token Retrieved")


if __name__ == "__main__":
    tester = FlaskTestCase()
    tester.test_1_get_all_users()
    # tester.test_2_post_user()
    # tester.test_3_post_message()
    tester.test_4_post_token()
