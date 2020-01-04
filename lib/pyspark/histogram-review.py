# ------------------------------------------------------------
# Get percentage of owners who rent out more than one property
# ------------------------------------------------------------

# imports
import pyspark.sql.functions as f
from pyspark.sql.session import SparkSession
from pyspark.context import SparkContext
from pyspark.sql.types import StringType
from pyspark.sql.functions import udf

# set context
sc = SparkContext.getOrCreate()
spark = SparkSession(sc)

def histogram_review_by_month():

    try:
        # read csv
        df = spark.read.csv('hdfs://localhost:9000/user/hadoop/inputs/listings.csv', header=True)

        df = df.select('last_review')
        df = df.na.drop()
        # df.filter(df.last_review < 100).show()

        # filter string columns with date because of decimal values
        df = df.filter(df.last_review.contains('-'))
        
        # substring the column value for upto to month range
        udf_month = udf(lambda x:x[0:7],StringType())
        data = df.withColumn('last_review', udf_month('last_review'))
        
        # group and sort by monthly reviews count
        data = data.groupBy('last_review').count().select('last_review', f.col('count').alias('count')).sort('last_review')

        # save file into hdfs
        data.repartition(1).write.format("com.databricks.spark.csv").option("header", "true").save('hdfs://localhost:9000/user/hadoop/output/pyspark/histogram-month')

    except Exception as e:
        print(e)

# execute fucntion
histogram_review_by_month()
