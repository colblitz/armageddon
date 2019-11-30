// 'mongo scripts/init.js'

db = connect("localhost:27017/armageddon");

print("existing collections:");
print(db.getCollectionNames());

print("creating questions");
db.createCollection("questions");

print("creating users");
db.createCollection("users");

print("creating answersets");
db.createCollection("answersets");

print("creating answers");
db.createCollection("answers");

print("creating sections");
db.createCollection("sections");

print("done");