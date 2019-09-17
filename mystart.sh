#!/bin/bash

function restartFabric() {
    cd hyperledger-fabric
    ./foreign-trade.sh -m down
    sync
    ./foreign-trade.sh -m up
    cd ..
}

function restartExplorer() {
    cd scripts
    node restart.js
    cd ..
    docker-compose down
    rm -rf examples/net1/pgdata/*
    ls examples/net1/pgdata/
    docker-compose up -d
}

while getopts "h?r:c:t:d:f:s:" opt; do
  case "$opt" in
    r)  MODE=$OPTARG
    ;;
  esac
done

# restart fabric app, explorer or both
if [ "$MODE" == "fabric" ]; then
  restartFabric
  elif [ "$MODE" == "explorer" ]; then
  restartExplorer
  elif [ "$MODE" == "all" ]; then
  restartFabric
  restartExplorer
else
  exit 1
fi
