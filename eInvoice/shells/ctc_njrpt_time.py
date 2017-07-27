#! /usr/bin/env python
'''
Name Process: ctc_txrpt_time.py
Autor: Ramses Hernandez
Company:Citec
Date dd/mm/aaaa: 04/05/2014
Objective: Check time delay per Service
#Msg: If you have a better idea let us know please
'''
import sys
#import datetime

print "------------------------------------Delay psr RRT---------------------------------"
print "Service" + "\t\tPID" + "\tTime (ms)\t\tStarTime\t\tEndTime"
print "----------------------------------------------------------------------------------"
for line in sys.stdin:
        #print line
        stderr=line.split();
        #if (stderr[0]=="@AVAIL_SERVICE") or (stderr[0]=="@AVAILABILITY") or(stderr[0]=="DcsGateway") or (stderr[0]=="@TCN_SERVICE"):
        if (stderr[0]=="@TCN_SERVICE"):
                #dtStart=datetime.datetime.fromtimestamp(int(stderr[2])).strftime('%Y-%m-%d %H:%M:%S');
                #dtEnd=datetime.datetime.fromtimestamp(int(stderr[4])).strftime('%Y-%m-%d %H:%M:%S');
                ms=(float(stderr[4])-float(stderr[2]))*1000+(float(stderr[5])-float(stderr[3]))/1000;
                if int(ms)>0:
                        print stderr[0] + "\t" + stderr[1]  + "\t" + str(ms) + "\t" + "-" + "\t" + "-";
                else:
                        print stderr[0] + "\t" + stderr[1]  + "\t" + str(ms) + "\t\t" + "-" + "\t" + "-";
