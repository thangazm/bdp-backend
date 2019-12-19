# ----------------------------------------------------------
# Mapper function for total rent count on 365 availability
# ----------------------------------------------------------

# imports
import sys
import csv


def mapper_rental_count():

    try:
        availability = []
        for row in csv.reader(iter(sys.stdin.readline, '')):
            availability.append(row[15])
        
        availability = availability[1:]

        for days in availability:
            days = int(days)
            if days == 365:
                print('%s\t%s' % (days, 1))
                
    except Exception as e:
        print(e)

# run function mapper
mapper_rental_count()

