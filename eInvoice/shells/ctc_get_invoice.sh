#!/bin/bash

while read folios
do
	mv ./bkImage/$folios".jpg" ./bakInvoices
	mv ./bkXml/$folios".xml" ./bakInvoices
	mv ./bkInvoice/$folios".pdf" ./bakInvoices

done < folios.txt
