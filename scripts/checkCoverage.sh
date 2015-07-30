#!/bin/bash

# checks line coverage for unit tests. Returns a 1 if coverage is below the theshold and should be a build error.
# Part of the CI build suite.

COVERAGE_FILE="../coverage/PhantomJS 1.9.2 (Linux)/coverage.xml"

#checks the line-rate coverage in cobertura
echo "Checking the Unit Test Coverage"
cat "$COVERAGE_FILE" | awk -v RS='"' '/line-rate=$/{
    getline;
    if ($1 < 0.95) {
        print "Test Coverage is below the required 90% line coverage threshold. This build has failed."
        exit 1;
    }else{
        print "Test Coverage is good."
        exit 0
    }
}'