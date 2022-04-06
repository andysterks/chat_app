import os
import psycopg2
import bcrypt


password = os.environ.get("PASSWORD")


def getUsersConnection():

    connection = psycopg2.connect(
        host="ec2-52-71-69-66.compute-1.amazonaws.com",
        port="5432",
        database="dfohmf7phrnrjp",
        user="tpemykhqhjpokb",
        password=password,
        sslmode="require"
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
        host="ec2-52-71-69-66.compute-1.amazonaws.com",
        port="5432",
        database="dfohmf7phrnrjp",
        user="tpemykhqhjpokb",
        password=password,
        sslmode="require"
    )
    
    hashedPassword = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    stringedHashedPassword = hashedPassword.decode()
    cursor = connection.cursor()
    cursor.execute(
        f"INSERT INTO users (username, password) VALUES ('{username}', '{stringedHashedPassword}')"
    )
    connection.commit()
    cursor.close()
    connection.close()


def getSingleUserConnection(id):

    connection = psycopg2.connect(
        host="ec2-52-71-69-66.compute-1.amazonaws.com",
        port="5432",
        database="dfohmf7phrnrjp",
        user="tpemykhqhjpokb",
        password=password,
        sslmode="require"
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
        host="ec2-52-71-69-66.compute-1.amazonaws.com",
        port="5432",
        database="dfohmf7phrnrjp",
        user="tpemykhqhjpokb",
        password=password,
        sslmode="require"
    )

    formattedTime = "Formatted_Time"
    formattedDate = "Formatted_Date"

    cursor = connection.cursor()
    cursor.execute(
       f"SELECT *, to_char (time_created, 'HH:MI PM') AS {formattedTime}, to_char (createddate, 'MM/DD/YY') AS {formattedDate} FROM messages ORDER BY {formattedDate} ASC"
    )
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def getSingleMessageConnection(messageId):
    connection = psycopg2.connect(
        host="ec2-52-71-69-66.compute-1.amazonaws.com",
        port="5432",
        database="dfohmf7phrnrjp",
        user="tpemykhqhjpokb",
        password=password,
        sslmode="require"
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
        host="ec2-52-71-69-66.compute-1.amazonaws.com",
        port="5432",
        database="dfohmf7phrnrjp",
        user="tpemykhqhjpokb",
        password=password,
        sslmode="require"
    )
    cursor = connection.cursor()
    cursor.execute(f"INSERT INTO messages (userid, text, topic) VALUES ('{userId}', '{text}', '{topic}')")
    connection.commit()
    cursor.close()
    connection.close()


def getMessagesByTopicConnection(topic):
   

    connection = psycopg2.connect(
        host="ec2-52-71-69-66.compute-1.amazonaws.com",
        port="5432",
        database="dfohmf7phrnrjp",
        user="tpemykhqhjpokb",
        password=password,
        sslmode="require"
    )
    formattedTime = "Formatted_Time"
    formattedDate = "Formatted_Date"

    cursor = connection.cursor()
    cursor.execute(f"SELECT *, to_char (time_created, 'fmHH:MI PM') AS {formattedTime}, to_char (createddate, 'Day, Month fmDDth, YYYY') AS {formattedDate} FROM messages WHERE topic='{topic}' ORDER BY messageid ASC")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records



def checkUserConnection(username):

    connection = psycopg2.connect(
        host="ec2-52-71-69-66.compute-1.amazonaws.com",
        port="5432",
        database="dfohmf7phrnrjp",
        user="tpemykhqhjpokb",
        password=password,
        sslmode="require"
    )
    cursor = connection.cursor()
    cursor.execute(f"SELECT username, password FROM users WHERE username='{username}'")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records

