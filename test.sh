#!/bin/bash

echo "Running jshint..."
jshint .
RET=$?
if [ "$RET" != "0" ]; then
    exit 1
fi
echo "Running jasmine"
jasmine
if [ "$RET" != "0" ]; then
    exit 1
fi
