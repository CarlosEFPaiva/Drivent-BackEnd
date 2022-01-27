CREATE TABLE "addresses" (
	"id" serial NOT NULL,
	"cep" varchar(255) NOT NULL,
	"street" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"number" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"neighborhood" varchar(255) NOT NULL,
	"addressDetail" varchar(255),
	"enrollmentId" integer NOT NULL,
	CONSTRAINT "addresses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "enrollments" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"cpf" varchar(255) NOT NULL UNIQUE,
	"birthday" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "enrollments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"token" varchar(255) NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "settings" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"value" varchar(255) NOT NULL,
	CONSTRAINT "settings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"id" serial NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	"ticketId" integer,
	"accomodationId" integer,
	"statusId" integer NOT NULL DEFAULT 1,
	"roomId" integer,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tickets" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" varchar(255) NOT NULL,
	CONSTRAINT "tickets_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hotels" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"imageUrl" TEXT NOT NULL,
	CONSTRAINT "hotels_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "accomodation_types" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" varchar(255) NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "status" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "status_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "room_type" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"capacity" integer NOT NULL UNIQUE,
	CONSTRAINT "room_type_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "rooms" (
	"id" serial NOT NULL,
	"number" varchar(255) NOT NULL,
	"typeId" integer NOT NULL,
	"hotelId" integer NOT NULL,
	"occupation" integer NOT NULL,
	CONSTRAINT "rooms_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users_events" (
"id" serial NOT NULL,
"userId" integer NOT NULL,
"eventId" integer NOT NULL,
CONSTRAINT "users_events_pk" PRIMARY KEY ("id")
) WITH (
OIDS=FALSE
);

CREATE TABLE "events" (
"id" serial NOT NULL,
"name" varchar(255) NOT NULL,
"dateId" integer NOT NULL,
"locationId" integer NOT NULL,
"startTime" TIME NOT NULL,
"endTime" TIME NOT NULL,
"vacancies" integer NOT NULL,
CONSTRAINT "events_pk" PRIMARY KEY ("id")
) WITH (
OIDS=FALSE
);

CREATE TABLE "dates" (
	"id" serial NOT NULL,
	"name" date NOT NULL UNIQUE,
	CONSTRAINT "dates_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "locations" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "locations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id");

ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk1" FOREIGN KEY ("accomodationId") REFERENCES "accomodation_types"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk2" FOREIGN KEY ("statusId") REFERENCES "status"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk3" FOREIGN KEY ("roomId") REFERENCES "rooms"("id");

ALTER TABLE "users" ADD CONSTRAINT "users_ck0" CHECK (
	("ticketId" IS NOT NULL AND "accomodationId" IS NOT NULL) OR 
	("ticketId" IS NULL AND "accomodationId" IS NULL)
);
ALTER TABLE "users" ADD CONSTRAINT "users_ck1" CHECK ("ticketId" <> 2 OR "accomodationId" <> 2);

ALTER TABLE "rooms" ADD CONSTRAINT "rooms_fk0" FOREIGN KEY ("typeId") REFERENCES "room_type"("id");
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_fk1" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id");

ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("dateId") REFERENCES "dates"("id");
ALTER TABLE "events" ADD CONSTRAINT "events_fk1" FOREIGN KEY ("locationId") REFERENCES "locations"("id");


ALTER TABLE "users_events" ADD CONSTRAINT "users_events_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "users_events" ADD CONSTRAINT "users_events_fk1" FOREIGN KEY ("eventId") REFERENCES "events"("id");

INSERT INTO "settings" (name, value) VALUES ('start_date', NOW()), ('end_date','2021-11-25 20:30:00'), ('event_title', 'Driven.t'), ('background_image', 'linear-gradient(to right, #FA4098, #FFD77F)'), ('logo_image', 'https://driveneducation.com.br/wp-content/uploads/2021/07/logo-footer.svg');

INSERT INTO "tickets" (name, price) VALUES ('Presencial', '250'), ('Online', '100');

INSERT INTO "accomodation_types" (name, price) VALUES ('Sem Hotel', '0'), ('Com Hotel', '350');

INSERT INTO "status" (name) VALUES ('logged'), ('enrolled'), ('reserved'), ('purchased');

INSERT INTO "locations" (name) VALUES ('Auditório Principal'), ('Auditório Lateral'), ('Sala de Workshop');
