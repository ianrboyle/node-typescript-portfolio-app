CREATE DATABASE portfolio;

CREATE TABLE positions(
  position_id SERIAL PRIMARY KEY,
  symbol VARCHAR (10),
  company_name VARCHAR (100),
  cost_basis FLOAT,
  current_price FLOAT,
  quantity FLOAT,
  current_value FLOAT
);