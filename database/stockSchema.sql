DROP DATABASE IF EXISTS usersStocks;
CREATE DATABASE usersStocks

USE usersStocks

CREATE TABLE stock {
  id INT AUTO_INCREMENT,
  stockTicker VARCHAR(20),
  PRIMARY KEY (id)
}

CREATE TABLE user {
  id INT AUTO_INCREMENT,
  username VARCHAR(200),
  stock_id INT (200),
  PRIMARY KEY (id),
  FOREIGN KEY (stock_id) REFERENCES (stock.id)

}

SELECT user.username, stock.stockTicker,
FROM user
INNER JOIN stock ON user.stock_id = stock.id;