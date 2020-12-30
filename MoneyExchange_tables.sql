CREATE DATABASE MONEYEXCHANGE;

USE MONEYEXCHANGE;

CREATE TABLE SecurityCode_TB (
	idx_code INT primary key auto_increment,
    security_code INT,
    nexon_email VARCHAR(100) not null
);

CREATE TABLE Users_TB (
	idx_user INT primary key auto_increment,
    name_user VARCHAR(40) not null,
    email_user VARCHAR(40) not null,
    password_user VARCHAR(40) not null,
    salt VARCHAR(200),
    created_at DATETIME default current_timestamp,
    update_at DATETIME,
    role VARCHAR(20) default 'None',
    money_platform INT default 100,
    image_path VARCHAR(100) default './jpg/basicprofile.jpg'
);

CREATE TABLE NexonInfo_TB (
	idx_nexon_user INT primary key auto_increment,
    idx_user INT not null,
    email_nexon VARCHAR(40) not null,
    foreign key (idx_user) references Users_TB (idx_user)
    on delete cascade
);

CREATE TABLE Games_TB (
	idx_game INT primary key auto_increment,
    name_game VARCHAR(100) not null,
    game_intro VARCHAR(500),
    image_path VARCHAR(40)
);

CREATE TABLE Characters_TB (
	idx_character INT primary key auto_increment,
    idx_user INT,
    idx_game INT,
    name_character VARCHAR(100) not null,
    money_character BIGINT not null,
    foreign key (idx_user) references Users_TB (idx_user)
    on delete cascade,
    foreign key (idx_game) references GAMES_TB (idx_game)
    on delete cascade
);

CREATE TABLE ExchangeRate_TB (
	idx_exchang_rate INT primary key auto_increment,
    idx_game INT,
    exchange_rate INT not null,
    foreign key (idx_game) references GAMES_TB (idx_game)
    on delete cascade
);

CREATE TABLE Exchange_TB (
	idx_exchange INT primary key auto_increment,
    idx_character INT,
    idx_exchang_rate INT,
    fee INT,
    moneydir varchar(30),
    exchange_time DATETIME default current_timestamp,
    game_money INT,
    platform_money INT,
    approvalYn VARCHAR(20) not null default 'N',
    foreign key (idx_character) references Characters_TB (idx_character),
    foreign key (idx_exchang_rate) references ExchangeRate_TB (idx_exchang_rate)
);












