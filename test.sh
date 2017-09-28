#!/bin/bash

echo "Running jshint..."
jshint .
RET=$?
if [ "$RET" != "0" ]; then
    exit 1
fi

echo -n "Starting server in the background..."
timeout 2m $(which npm) start > /dev/null 2>&1 &
echo "done"
echo "Running jasmine"
jasmine
RET=$?
if [ "$RET" != "0" ]; then
    exit 1
fi

which timeout
RET=$?
if [ "$RET" != "0" ]; then
    exit 0
fi

