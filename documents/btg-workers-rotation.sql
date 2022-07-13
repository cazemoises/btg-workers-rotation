CREATE TABLE seat(
  id TEXT NOT NULL,
  building_sys TEXT NOT NULL,
  floor_sys INTEGER NOT NULL,
  table_sys INTEGER NOT NULL,
  section_sys TEXT NOT NULL,
  status_sys TEXT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE person(cpf INTEGER NOT NULL, name TEXT NOT NULL, PRIMARY KEY(cpf));

CREATE TABLE user_sys(
  email TEXT NOT NULL,
  person_cpf INTEGER NOT NULL,
  pass TEXT NOT NULL,
  status_sys TEXT NOT NULL,
  PRIMARY KEY(email),
  CONSTRAINT person_user FOREIGN KEY (person_cpf) REFERENCES person (cpf)
);

CREATE TABLE user_seat(
  user_sys_email TEXT NOT NULL,
  seats_id TEXT NOT NULL,
  date timestamp NOT NULL,
  CONSTRAINT user_user_seat
    FOREIGN KEY (user_sys_email) REFERENCES user_sys (email),
  CONSTRAINT seats_user_seat FOREIGN KEY (seats_id) REFERENCES seat (id)
);
