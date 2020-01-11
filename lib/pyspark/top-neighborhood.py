# ------------------------------------------------------------
# Get top neighborhood that available on 365 days
# ------------------------------------------------------------

# imports
import pyspark.sql.functions as f
from pyspark.sql import SQLContext
from pyspark.context import SparkContext
from pyspark.sql.session import SparkSession

# set context
sc = SparkContext.getOrCreate()
spark = SparkSession(sc)
sqlContext = SQLContext(sc)

def top_neighborhood():
    
    try:
        # read csv
        df = spark.read.csv('hdfs://localhost:9000/user/hadoop/sparkinput/listings.csv', header=True)
        df.createOrReplaceTempView("top_neighbourhood")
        # df.select('neighbourhood').show()

        df2 = sqlContext.sql('select neighbourhood, count(*) as number_of_rentals from  top_neighbourhood where neighbourhood in (select neighbourhood from (select neighbourhood, avg(price) as price from top_neighbourhood group by neighbourhood order by price desc limit 5)) and availability_365 = 365 group by neighbourhood')
        # save file into hdfs
        df2.repartition(1).write.format("com.databricks.spark.csv").option("header", "false").save('hdfs://localhost:9000/user/hadoop/output/pyspark/number-of-rentals')

    except Exception as e:
        print(e)

# execute fucntion
top_neighborhood()