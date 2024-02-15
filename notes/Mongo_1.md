# MongoDB Fundamental Concepts and Commands

MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It is known for its scalability, flexibility, and ease of use. Here are some fundamental concepts and commands in MongoDB:

## 1. Database

### Create a Database
```bash
use mydatabase
```

### Show Databases
```bash
show dbs
```

## 2. Collection

Collections are groups of MongoDB documents. They are equivalent to tables in relational databases.

### Create a Collection
```bash
db.createCollection("mycollection")
```

### Show Collections in the Current Database
```bash
show collections
```

## 3. Document

Documents are the basic unit of data in MongoDB, similar to a row in a relational database.

### Insert a Document
```bash
db.mycollection.insertOne({
  name: "John Doe",
  age: 30,
  email: "john@example.com"
})
```

### Find Documents
```bash
db.mycollection.find()
```

## 4. Querying

MongoDB provides powerful querying capabilities using a rich set of operators.

### Basic Query
```bash
db.mycollection.find({ name: "John Doe" })
```

### Projection (Selecting Specific Fields)
```bash
db.mycollection.find({ name: "John Doe" }, { name: 1, age: 1 })
```

## 5. Update

### Update a Document
```bash
db.mycollection.updateOne({ name: "John Doe" }, { $set: { age: 31 } })
```

### Update Multiple Documents
```bash
db.mycollection.updateMany({ age: { $gte: 30 } }, { $set: { status: "adult" } })
```

## 6. Delete

### Delete a Document
```bash
db.mycollection.deleteOne({ name: "John Doe" })
```

### Delete Multiple Documents
```bash
db.mycollection.deleteMany({ age: { $gte: 30 } })
```

## 7. Indexing

Indexes improve the speed of queries but may increase the storage size.

### Create an Index
```bash
db.mycollection.createIndex({ name: 1 })
```

### List Indexes
```bash
db.mycollection.getIndexes()
```

These are just some basic concepts and commands to get you started with MongoDB. MongoDB provides many more features and options for advanced use cases.
