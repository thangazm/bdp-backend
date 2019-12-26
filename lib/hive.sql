CREATE DATABASE IF NOT EXISTS bdphive;
CREATE SCHEMA IF NOT EXISTS bdp;


CREATE EXTERNAL TABLE IF NOT EXISTS bdp.hive(id INT, name STRING, host_id INT, host_name STRING, neighborhood_group STRING, neighborhood STRING, latitude FLOAT, longtitude FLOAT, room_type STRING, price INT, minimum_nights INT, number_of_reviews INT, last_review DATE, reviews_per_month FLOAT, calculated_host_listing_count INT, availability_365 INT)
-- ROW FORMAT DELIMITED
-- FIELDS TERMINATED BY ','
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.OpenCSVSerde'
LOCATION 'hdfs:/user/hadoop/inputs';

ALTER TABLE hive SET TBLPROPERTIES("skip.header.line.count"="1");

1. INSERT OVERWRITE DIRECTORY '/user/hadoop/output/hive2.2.1/' row format delimited fields terminated by ',' select neighborhood_group, avg(price) as avg_ from hive where room_type = 'Private room' group by neighborhood_group sort by avg_;
2. INSERT OVERWRITE DIRECTORY '/user/hadoop/output/hive2.2.2/' row format delimited fields terminated by ',' select neighborhood, avg_ from ( select neighborhood, avg(price) as avg_ from hive where room_type = 'Private room' group by neighborhood) hive order by avg_ desc limit 10;