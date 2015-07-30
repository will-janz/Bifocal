#!/bin/bash

# runs unit tests via karma for the CI server.
#

BASE_DIR=`dirname $0`

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"

../node_modules/karma/bin/karma start $BASE_DIR/../config/karma.ci.conf.js $*
# karma start $BASE_DIR/../config/karma.ci.conf.js $*
