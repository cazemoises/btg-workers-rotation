CREATE TABLE seats(
  id INTEGER NOT NULL,
  building TEXT NOT NULL,
  floor INTEGER NOT NULL,
  "table" INTEGER NOT NULL,
  section TEXT NOT NULL,
  status TEXT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE person(cpf INTEGER NOT NULL, nome TEXT NOT NULL, PRIMARY KEY(cpf));

CREATE TABLE user(
  email TEXT NOT NULL,
  person_cpf INTEGER NOT NULL,
  pass TEXT NOT NULL,
  status TEXT NOT NULL,
  PRIMARY KEY(email),
  CONSTRAINT person_user FOREIGN KEY (person_cpf) REFERENCES person (cpf)
);

CREATE TABLE user_seat(
  user_email TEXT NOT NULL,
  seats_id INTEGER NOT NULL,
  date BLOB NOT NULL,
  PRIMARY KEY(seats_id),
  CONSTRAINT user_user_seat FOREIGN KEY (user_email) REFERENCES user (email),
  CONSTRAINT seats_user_seat FOREIGN KEY (seats_id) REFERENCES seats (id)
);
