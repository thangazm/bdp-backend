CREATE DATABASE IF NOT EXISTS bdphive;
CREATE SCHEMA IF NOT EXISTS bdp;


CREATE EXTERNAL TABLE IF NOT EXISTS bdp.hive(id INT, name STRING, host_id INT, host_name STRING, neighborhood_group STRING, neighborhood STRING, latitude FLOAT, longtitude FLOAT, roomtype STRING, price INT, minimum_nights INT, number_of_reviews INT, last_review DATE, reviews_per_month FLOAT, calculated_host_listing_count INT, availability_365 INT)
# ROW FORMAT DELIMITED
# FIELDS TERMINATED BY ','
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.OpenCSVSerde'
LOCATION 'hdfs:/user/hadoop/inputs';

CREATE TABLE IF NOT EXISTS bdp.airbnb as SELECT cast(id as int) as id, cast(host_id as int) as host_id,cast(neighborhood_group as string) as neighborhood_group, cast(neighborhood as string) as neighborhood, cast(latitude as float) as latitude, cast(longtitude as float) as longtitude,cast(roomtype as string) as roomtype, cast(price as int) as price, cast(minimum_nights as int) as minimum_nights, cast(number_of_reviews as int) as number_of_reviews, cast(last_review as date) as last_review, cast(reviews_per_month as float) as reviews_per_month, cast(calculated_host_listing_count as int) as calculated_host_listing_count, cast(availability_365 as int) as availability_365 from hive;

ALTER TABLE airbnb SET TBLPROPERTIES("skip.header.line.count"="1");

INSERT OVERWRITE DIRECTORY '/user/hadoop/output/hive2.2.1/' row format delimited fields terminated by ',' select neighborhood_group, avg(price) as avg_ from airbnb where roomtype = 'Private room' group by neighborhood_group sort by avg_;
INSERT OVERWRITE DIRECTORY '/user/hadoop/output/hive2.2.2/' row format delimited fields terminated by ',' select neighborhood, avg_ from ( select neighborhood, avg(price) as avg_ from airbnb where roomtype = 'Private room' group by neighborhood) hive order by avg_ desc limit 10;
INSERT OVERWRITE DIRECTORY '/user/hadoop/output/hive2.2.3/' row format delimited fields terminated by ',' SELECT host_id, price, roomtype FROM (SELECT ROW_NUMBER()OVER(PARTITION BY roomtype ORDER BY price ASC) AS price_range, * FROM airbnb) x WHERE price is not NULL AND price_range IN (1,2,3,4,5);