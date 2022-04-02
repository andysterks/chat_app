import os
import psycopg2

password = os.environ.get("PASSWORD")


def getUsersConnection():

    connection = psycopg2.connect(
        host="localhost",
        port="5432",
        database="chat_app",
        user="postgres",
        password=password,
    )
    cursor = connection.cursor()
    cursor.execute("SELECT username, id FROM users")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def createUserConnection(username, password):

    connection = psycopg2.connect(
        host="localhost",
        port="5432",
        database="chat_app",
        user="postgres",
        password=password,
    )
    cursor = connection.cursor()
    cursor.execute(
        f"INSERT INTO users (username, password) VALUES ('{username}', '{password}')"
    )
    connection.commit()
    cursor.close()
    connection.close()


def getSingleUserConnection(id):

    connection = psycopg2.connect(
        host="localhost",
        port="5432",
        database="chat_app",
        user="postgres",
        password=password,
    )
    cursor = connection.cursor()
    cursor.execute(f"SELECT username,id FROM users WHERE Id={id}")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def getMessagesConnection():
    connection = psycopg2.connect(
        host="localhost",
        port="5432",
        database="chat_app",
        user="postgres",
        password=password,
    )

    formattedTime = "Formatted_Time"
    formattedDate = "Formatted_Date"

    cursor = connection.cursor()
    cursor.execute(
       f"SELECT *, to_char (time_created, 'HH:MI PM') AS {formattedTime}, to_char (createddate, 'MM/DD/YY') AS {formattedDate} FROM messages"
    )
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def getSingleMessageConnection(messageId):
    connection = psycopg2.connect(
        host="localhost",
        port="5432",
        database="chat_app",
        user="postgres",
        password=password,
    )
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM messages WHERE messageid={messageId}")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def createMessageConnection(userId, text, topic):
    connection = psycopg2.connect(
        host="localhost",
        port="5432",
        database="chat_app",
        user="postgres",
        password=password,
    )
    cursor = connection.cursor()
    cursor.execute(f"INSERT INTO messages (userid, text, topic) VALUES ('{userId}', '{text}', '{topic}')")
    connection.commit()
    cursor.close()
    connection.close()


def getMessagesByTopicConnection(topic):
   

    connection = psycopg2.connect(
        host="localhost",
        port="5432",
        database="chat_app",
        user="postgres",
        password=password,
    )
    formattedTime = "Formatted_Time"
    formattedDate = "Formatted_Date"

    cursor = connection.cursor()
    cursor.execute(f"SELECT *, to_char (time_created, 'HH:MI PM') AS {formattedTime}, to_char (createddate, 'Day, Month fmDDth, YYYY') AS {formattedDate} FROM messages WHERE topic='{topic}'")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records



def checkUserConnection(username):

    connection = psycopg2.connect(
        host="localhost",
        port="5432",
        database="chat_app",
        user="postgres",
        password=password,
    )
    cursor = connection.cursor()
    cursor.execute(f"SELECT username, password FROM users WHERE username='{username}'")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records