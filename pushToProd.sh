#!/usr/bin/bash

git push
ssh ubuntu@arizonuts.click
cd services/startup
git pull
sleep(10)
