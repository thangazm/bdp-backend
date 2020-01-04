#!/usr/bin/python
# -------------------------------------------------------------
# reducer function for number of rentals per neighborhood group
# -------------------------------------------------------------

# imports
import sys
 
ng_count = {}
def reducer_rental_neighbor_group():
    
    try:
        for line in sys.stdin:
            line = line.strip()

            group, count = line.split('\t', 1)

            count = int(count)

            try:
                ng_count[group] = ng_count[group]+count
            except:
                ng_count[group] = count

        for group in ng_count.keys():
            print '%s\t%s'% ( group, ng_count[group] )
                
    except Exception as e:
        print e

# run function reducer
reducer_rental_neighbor_group()
