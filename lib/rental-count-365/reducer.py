# ----------------------------------------------------------
# reducer function for total rent count on 365 availability
# ----------------------------------------------------------

# imports
import sys
 
dayscount = {}
def reducer_rental_count():
    
    try:
        for line in sys.stdin:
            line = line.strip()

            days, count = line.split('\t', 1)

            count = int(count)

            try:
                dayscount[days] = dayscount[days]+count
            except:
                dayscount[days] = count

        for days in dayscount.keys():
            print ('%s\t%s'% ( days, dayscount[days] ))
                
    except Exception as e:
        print(e)

# run function reducer
reducer_rental_count()
