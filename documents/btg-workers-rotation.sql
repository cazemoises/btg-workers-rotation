CREATE TABLE seat(
  id TEXT NOT NULL,
  building_sys TEXT NOT NULL,
  floor_sys INTEGER NOT NULL,
  table_sys INTEGER NOT NULL,
  section_sys TEXT NOT NULL,
  status_sys TEXT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE person(
  identification_value INTEGER NOT NULL,
  name TEXT NOT NULL,
  identification_identification_type_code INTEGER NOT NULL,
  PRIMARY KEY(identification_value),
  CONSTRAINT identification_type_person
    FOREIGN KEY (identification_identification_type_code)
      REFERENCES identification (identification_type_code)
);

CREATE TABLE user_sys(
  email TEXT NOT NULL,
  person_identification_value INTEGER NOT NULL,
  pass TEXT NOT NULL,
  status_sys TEXT NOT NULL,
  PRIMARY KEY(email),
  CONSTRAINT person_user
    FOREIGN KEY (person_identification_value)
      REFERENCES person (identification_value)
);

CREATE TABLE user_seat(
  user_sys_email TEXT NOT NULL,
  seat_id TEXT NOT NULL,
  date timestamp NOT NULL,
  CONSTRAINT user_user_seat
    FOREIGN KEY (user_sys_email) REFERENCES user_sys (email),
  CONSTRAINT seat_user_seat FOREIGN KEY (seat_id) REFERENCES seat (id)
);

CREATE TABLE identification(
identification_type_code INTEGER NOT NULL, identification_type TEXT NOT NULL,
  PRIMARY KEY(identification_type_code)
);