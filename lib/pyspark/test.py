# from pyspark.sql import SparkSession

# sparkSession = SparkSession.builder.appName("example-pyspark-read-and-write").getOrCreate()


# Read from HDFS
df = spark.read.csv('hdfs://localhost:9000/user/hadoop/inputs/listings.csv', header=True)
# df_load.show()

# read host_name
hosts = df.select('host_name')

for host in hosts:
    print()



df.groupBy('host_name').count().select('host_name', spark.col('count').alias('count')).write.format('com.databricks.spark.csv').options(header='true').save('hdfs://localhost:9000/user/hadoop/output/pyspark/owner-count-2.csv')

df.groupBy('host_name').count().select('host_name', f.col('count').alias('count')).repartition(1).write.format('com.databricks.spark.csv').save('hdfs://localhost:9000/user/hadoop/output/pyspark/owner-count-4.csv',header = 'true')

import pyspark.sql.functions as f


data = df.groupBy('host_name').count().select('host_name', f.col('count').alias('count'))
data.createOrReplaceTempView("mytable")


df2 = sqlContext.sql("select host_name, count, (count * 100)/sum(count)over() AS percentage from mytable where count != 1").show()

df2.repartition(1).write.format("com.databricks.spark.csv").option("header", "true").save('hdfs://localhost:9000/user/hadoop/output/pyspark/owner-percentage')


# question 2
df = spark.read.csv('hdfs://localhost:9000/user/hadoop/inputs/listings.csv', header=True)
df = df.select('last_review')
# df.filter(df.last_review < 100).show()
df = df.filter(df.last_review.contains('20'))
df = df.na.drop()
from pyspark.sql.types import StringType
from pyspark.sql.functions import udf
udf1 = udf(lambda x:x[0:7],StringType())
data = df.withColumn('last_review',udf1('last_review'))
data = data.groupBy('last_review').count().select('last_review', f.col('count').alias('count')).sort('last_review')



df2 = spark.read.options(Map("delimiter"->","))
  .csv("src/main/resources/zipcodes.csv")

  spark.read.option("delimiter", ",").csv('hdfs://localhost:9000/user/hadoop/inputs/listings.csv', header=True)

  df = spark.read.format('csv').options(header='true', quote='\"', delimiter='|',ignoreLeadingWhiteSpace='true',inferSchema='true').load('hdfs://localhost:9000/user/hadoop/inputs/listings.csv')




