# ------------------------------------------------------------
# Get percentage of owners who rent out more than one property
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

def write_owner_percentage():

    try:
        # read csv
        df = spark.read.csv('hdfs://localhost:9000/user/hadoop/inputs/listings.csv', header=True)

        # derive columns and add into a table
        data = df.groupBy('host_name').count().select('host_name', f.col('count').alias('count'))
        data.createOrReplaceTempView("owners")

        # get total count of properties rented
        total_count = df.select('host_name').count()

        # get percentage
        # df2 = sqlContext.sql('select host_name, count, (count * 100)/%s AS percentage from owners where count != 1' % (total_count))
        df2 = sqlContext.sql('select SUM(count) * 100/%s AS percentage from owners where count > 1' % (total_count))
        # save file into hdfs
        df2.repartition(1).write.format("com.databricks.spark.csv").option("header", "false").save('hdfs://localhost:9000/user/hadoop/output/pyspark/owner-percentage')

    except Exception as e:
        print(e)

# execute fucntion
write_owner_percentage()
