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
        df = spark.read.csv('hdfs://localhost:9000/user/hadoop/inputs/listings.csv', header=True)
        df.createOrReplaceTempView("top_neighbourhood")
        # df.select('neighbourhood').show()

        df2 = sqlContext.sql('select neighbourhood, price, count(*) as count from top_neighbourhood where availability_365 == 365 group by neighbourhood').show()

        df2.groupBy('neighbourhood').count().select('neighbourhood', f.col('count').alias('count')).orderBy('count')show()

        # sqlContext.sql('select substr(last_review,1,7) as month, count(*) as count from top_neighbourhood where substr(last_review,1,7) is not null group by month order by month').show()
        
        # derive columns and add into a table
        # data = df.groupBy('host_name').count().select('host_name', f.col('count').alias('count'))
        # data.createOrReplaceTempView("mytable")

        sqlContext.sql('select last_review from top_neighbourhood').show()
        # get percentage
        df2 = sqlContext.sql('select host_name, count, (count * 100)/%s AS percentage from mytable where count != 1' % (total_count))

        # save file into hdfs
        # df2.repartition(1).write.format("com.databricks.spark.csv").option("header", "true").save('hdfs://localhost:9000/user/hadoop/output/pyspark/owner-percentage')

    except Exception as e:
        print(e)

# execute fucntion
top_neighborhood()
