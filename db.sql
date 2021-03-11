CREATE DATABASE todos;

CREATE TABLE todo(
    todo_id SERIAL NOT NULL,
    task text,
    PRIMARY KEY (todo_id)
);

CREATE TABLE completed(
    completed_id SERIAL NOT NULL,
    FOREIGN KEY (todo_id) REFERENCES todo (todo_id),
    todo_id INT,
    completed text
    
);

INSERT INTO todo (task) VALUES ('mkdir');
INSERT INTO todo (task) VALUES ('npm init');
INSERT INTO todo (task) VALUES ('create server.js');
INSERT INTO todo (task) VALUES ('install express');
INSERT INTO todo (task) VALUES ('install pg');
INSERT INTO todo (task) VALUES ('install morgan');
INSERT INTO todo (task) VALUES ('install cors');
INSERT INTO todo (task) VALUES ('create DB');
INSERT INTO todo (task) VALUES ('create table');
INSERT INTO todo (task) VALUES ('create table');
INSERT INTO todo (task) VALUES ('inset data');
INSERT INTO todo (task) VALUES ('build server');
INSERT INTO todo (task) VALUES ('build routes');
INSERT INTO todo (task) VALUES ('test routes');
INSERT INTO todo (task) VALUES ('frontend time');
INSERT INTO todo (task) VALUES ('refactor');

INSERT INTO completed (completed) WHERE todo_id = $1 VALUES ('Completed');