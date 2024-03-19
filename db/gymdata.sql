DROP TABLE IF EXISTS gymdata;

CREATE TABLE gymData (
  name          VARCHAR(100)    NOT NULL,
  count         INT             NOT NULL,
  last_updated  TIMESTAMP       NOT NULL,
  status        BOOLEAN         NOT NULL,

  CONSTRAINT PK_GymData PRIMARY KEY (name,count,last_updated,status)
);