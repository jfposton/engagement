#!/bin/bash

echo "Running jshint..."
jshint --show-non-errors .
echo "Running jasmine"
jasmine
