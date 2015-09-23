#!/bin/bash

echo "Running jshint..."
jshint .
RET=$?
if [ "$RET" != "0" ]; then
    exit 1
fi
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

timeout 10s $(which npm) start
RET=$?
if [ "$RET" != "124" ]; then
    exit 1
fi
