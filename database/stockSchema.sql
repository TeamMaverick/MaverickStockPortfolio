DROP DATABASE IF EXISTS usersStocks;
CREATE DATABASE usersStocks;

USE usersStocks;
DROP TABLE IF EXISTS stocks;
DROP TABLE IF EXISTS tickersAndNames;

-- CREATE TABLE stocks (
--   id INT NOT NULL AUTO_INCREMENT,
--   stock_ticker VARCHAR(20) NOT NULL,
--   company_name VARCHAR(1000) NOT NULL,
--   quantity INT NOT NULL,
--   price FLOAT(7, 2) NOT NULL,
--   UNIQUE (stock_ticker),
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE tickersAndNames (
--   id INT NOT NULL AUTO_INCREMENT,
--   stock_ticker VARCHAR(20) NOT NULL,
--   company_name VARCHAR(1000) NOT NULL,
--   PRIMARY KEY (id)
-- );
