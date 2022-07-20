CREATE TABLE seat(
  id TEXT NOT NULL,
  building TEXT NOT NULL,
  floor_number INTEGER NOT NULL,
  table_number INTEGER NOT NULL,
  section_name TEXT NOT NULL,
  status TEXT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE person(
  identification_value BIGINT NOT NULL,
  employee_name TEXT NOT NULL,
  identification_identification_type_code INTEGER NOT NULL,
  PRIMARY KEY(identification_value),
  CONSTRAINT identification_type_person
    FOREIGN KEY (identification_identification_type_code)
      REFERENCES identification (identification_type_code)
);

CREATE TABLE user_sys(
  email TEXT NOT NULL,
  person_identification_value BIGINT NOT NULL,
  pass TEXT NOT NULL,
  status TEXT NOT NULL,
  PRIMARY KEY(email),
  CONSTRAINT person_user
    FOREIGN KEY (person_identification_value)
      REFERENCES person (identification_value)
);

CREATE TABLE user_seat(
  id INTEGER AUTOINCREMENT NOT NULL,
  user_sys_email TEXT NOT NULL,
  seats_id TEXT NOT NULL,
  date timestamp NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE identification(
identification_type_code INTEGER NOT NULL, identification_type TEXT NOT NULL,
  PRIMARY KEY(identification_type_code)
);