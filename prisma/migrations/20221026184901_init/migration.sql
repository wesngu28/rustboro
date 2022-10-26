-- CreateTable
CREATE TABLE "Display" (
    "id" INT4 NOT NULL,
    "name" STRING NOT NULL,
    "art" STRING NOT NULL,
    "sprite" STRING NOT NULL,
    "abilities" STRING[],
    "stats" STRING[],
    "types" STRING[],
    "title" STRING NOT NULL,
    "blurb" STRING NOT NULL,
    "varieties" STRING[],
    "evolution" STRING[],

    CONSTRAINT "Display_pkey" PRIMARY KEY ("id")
);
