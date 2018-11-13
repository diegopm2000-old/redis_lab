#!/bin/sh

# Execute this script as source ./init.sh for export variables to global environment outside the script scope

# REDIS Host
export REDIS_HOST="172.17.0.1"
env | grep '^REDIS_HOST='
# REDIS Port
export REDIS_PORT="6379"
env | grep '^REDIS_PORT='
