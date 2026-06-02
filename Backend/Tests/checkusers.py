import psycopg2

conn = psycopg2.connect(
    dbname="user_system",
    user="postgres",
    password="hornup-kofzyH-hukmy8",
    host="localhost",
    port="5432"
)

cur = conn.cursor()
cur.execute(
    "SELECT * FROM users;"
)
data = cur.fetchone()
print(data)

cur.close()
conn.close()