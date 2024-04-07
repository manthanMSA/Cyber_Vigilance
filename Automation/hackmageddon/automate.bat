@echo off

echo Script started executing

scrapy crawl hackmageddon --loglevel=INFO > output.txt 2>&1
echo Output saved to output.txt.

call activate myenv

jupyter nbconvert --to notebook --execute hack_data1.ipynb --output executed_notebook.ipynb

pause


