create table users (
    id serial primary key,
    auth0_id varchar not null,
    email varchar not null,
    profile_name text not null,
    picture text not null
);

alter table users 
add column username varchar(30);



create table posts (
    id serial primary key,
    user_id int references users(id),
    title varchar,
    stamp date default now(),
    entry text,
    private boolean default true
);