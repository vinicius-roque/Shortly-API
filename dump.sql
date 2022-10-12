-- Creates Database
CREATE DATABASE shortlyapi;

-- Creates tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES "users"("id"),
    url TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "visitCount" INTEGER DEFAULT 0 NOT NULL
);