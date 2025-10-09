CREATE TABLE Listing (
  listing_number INT,
  title VARCHAR(128),
  description VARCHAR(128),
  date_created DATE,
  price INT,
  PRIMARY KEY (listing_number)
);

CREATE TABLE Account (
  account_number INT,
  username VARCHAR(128),
  password VARCHAR(128),
  email VARCHAR(128),
  phone_number VARCHAR(20),
  isAdmin BOOLEAN,
  PRIMARY KEY (account_number)
);

CREATE TABLE Transactions (
  transaction_id INT,
  lister_username VARCHAR(128),
  buyer_username VARCHAR(128),
  date_closed DATE,
  PRIMARY KEY (transaction_id)
);