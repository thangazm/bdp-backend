#!/usr/bin/python
# ------------------------------------------------------------
# Mapper function for number of rentals per neighborhood group
# ------------------------------------------------------------

# imports
import sys
import csv


def mapper_rental_neighbor_group():

    try:
        nh_groups = []
        for row in csv.reader(iter(sys.stdin.readline, '')):
            nh_groups.append(row[4])
        
        nh_groups = nh_groups[1:]

        for group in nh_groups:
            print '%s\t%s' % (group, 1)
                
    except Exception as e:
        print e

# run function mapper
mapper_rental_neighbor_group()

