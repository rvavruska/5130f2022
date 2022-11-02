create_table users (
	id int,
    user_name varchar(20),
    password varchar(60),
	email varchar(60),
    first_name varchar(20),
	last_name varchar(20),
	primary key (id)	
);

create_table products (
	id int,
	product_name varchar(20),
	url varchar(20),
	primary key (id)
);

create_table subscriptions (
	s_id int,
	u_id int,
	p_id int,
	start_date DATE,
	renewal_period int,
	primary key(s_id),
	foreign key (u_id) references users(u_id),
	foreign key (u_id) references products(p_id),
);