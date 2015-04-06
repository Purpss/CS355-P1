use bbickel;

drop table if exists Games;
drop table if exists Skins;
drop table if exists Champion;
drop table if exists Account;

-- create tables                                                                                                                
create table Champion (Champion_ID int auto_increment primary key,
       Name varchar(50) unique key,
       Cost_RP int,
       Cost_IP int);

create table Account (Username varchar(20),
       Password varchar(20),
       Player_tag varchar(20),
       Email varchar(50),
       Account_ID int auto_increment primary key,
       unique (Username, Email));

create table Skins (Skin_ID int auto_increment primary key,
       Champ_name varchar(25) references Champion(Name) on
       delete cascade on update cascade,
       Skin_name varchar(100) unique key,
       Cost int);

create table Games (Game_ID int auto_increment primary key,
        Champ_name varchar(50) references Champion(Name)on
        delete cascade on update cascade,
        Player_tag varchar(20) references Account(Player_tag)
        on delete cascade on update cascade,
        Kills int,
        Deaths int,
        Assists int,
        Win int,
        Loss int,
        Creep_score int);

-- insert into tables                                                                                                           

insert into Champion (Name, Cost_RP, Cost_IP) VALUES ("Lucian", 975, 6300),
        ("Annie", 260, 450), ("Reksai", 975, 6300),
        ("Janna", 585, 1350), ("Twitch", 790, 3150),
        ("Kennen", 880, 4800), ("Dr. Mundo", 585, 1350);

insert into Account (Username, Password, Player_tag, Email) VALUES
        ("bwbickel", "ilovedogs", "Monknam", "bwbickel123@gmail.com"),
        ("Monknam", "ilovecats", "SD Chem", "bickel@seawolf.sonoma.edu"),
        ("Anonymous Man", "ilovereptiles", "Summon Mahcawk", "ajdominguez95@yahoo.com"),
        ("thejack", "ilovejack", "JediJak", "jack@gmail.com");

insert into Skins (Champ_name, Skin_name, Cost) values
       ("Lucian", "Hired Gun Lucian", 975),
       ("Lucian", "Striker Lucian", 750),
       ("Annie", "Panda Annie", 975),
       ("Annie", "Prom Queen Annie", 520),
       ("Dr. Mundo", "Corporate Mundo", 1820),
       ("Dr. Mundo", "Rageborn Mundo", 975),
       ("Janna", "Forecast Janna", 1820),
       ("Twitch", "Gangster Twitch", 975);

insert into Games (Champ_name, Player_tag, Kills, Deaths, Assists, Win, Loss,
        Creep_score) values ("Lucian", "SD Chem", 21, 7, 5, 1, 0, 255),
        ("Lucian", "Summon Mahcawk", 16, 5, 5, 1, 0, 115),
        ("Annie", "JediJak", 1, 20, 4, 0, 1, 23),
        ("Dr. Mundo", "Monknam", 12, 11, 3, 0, 1, 174),
        ("Twitch", "SD Chem", 24, 3, 15, 1, 0, 245);
