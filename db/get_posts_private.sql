select * from posts p
join users u
on p.user_id = u.id
where p.private = true
and u.username = $1;