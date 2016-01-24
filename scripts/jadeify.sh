#!/bin/bash
echo "Compiling Jade files in public folder"

for i in `find public/ -name *.jade` ;
	do jade $i ; 
done