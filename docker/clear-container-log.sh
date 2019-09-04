#!/bin/sh

set -e

echo "======== start clean docker containers logs ========"

logs=$(find /var/lib/docker/containers/ -name *-json.log)

for log in $logs
    do
            echo "clean logs : $log"
            cat /dev/null > $log
    done

echo "======== end clean docker containers logs ========"

# sudo sh -c "$(curl https://raw.githubusercontent.com/zlzlife/zlz-project/master/docker/clear-container-log.sh)"
