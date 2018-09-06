DROP DATABASE IF EXISTS usersStocks;
CREATE DATABASE usersStocks;

USE usersStocks;
DROP TABLE IF EXISTS stock;

CREATE TABLE stock (
  id INT NOT NULL AUTO_INCREMENT,
  stock_ticker VARCHAR(20) NOT NULL,
<<<<<<< HEAD
  quantity INT NOT NULL,
  UNIQUE (stock_ticker),
  PRIMARY KEY (id)
);
=======
  PRIMARY KEY (id)
);

-- CREATE TABLE user (
--   id INT NOT NULL AUTO_INCREMENT,
--   username VARCHAR(200) NOT NULL,
--   stock_id INT NOT NULL,
--   PRIMARY KEY (id)
-- );
>>>>>>> dev
