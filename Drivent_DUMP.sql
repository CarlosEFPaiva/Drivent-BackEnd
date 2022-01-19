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
	"statusId" integer NOT NULL,
	"roomId" integer,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tickets" (
	"id" serial NOT NULL,
	"type" varchar(255) NOT NULL,
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



CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" varchar(255) NOT NULL,
	"ticketId" integer NOT NULL,
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

ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id");

ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk1" FOREIGN KEY ("statusId") REFERENCES "status"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk2" FOREIGN KEY ("roomId") REFERENCES "rooms"("id");

ALTER TABLE "categories" ADD CONSTRAINT "categories_fk0" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id");

ALTER TABLE "rooms" ADD CONSTRAINT "rooms_fk0" FOREIGN KEY ("typeId") REFERENCES "room_type"("id");
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_fk1" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id");

INSERT INTO "settings" (name, value) VALUES ('start_date', NOW()), ('end_date','2021-11-25 20:30:00'), ('event_title', 'Driven.t'), ('background_image', 'linear-gradient(to right, #FA4098, #FFD77F)'), ('logo_image', 'https://driveneducation.com.br/wp-content/uploads/2021/07/logo-footer.svg');
